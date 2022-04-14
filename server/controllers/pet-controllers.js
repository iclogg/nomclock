const HttpError = require("../models/http-error");
const Pet = require("../models/pet");
const User = require("../models/user");
const mongoose = require("mongoose");

/* READ */
const getPetById = async (req, res, next) => {
    const petId = req.params.petId;

    let pet;
    try {
        pet = await Pet.findById(petId)
            .populate("owner", "-password -pets")
            .populate("family", "-password -pets");
    } catch (err) {
        const error = new HttpError("Could not find that pet!", 500);
        return next(error);
    }

    if (!pet) {
        return next(new HttpError("Could not find that pet!", 404));
    }

    res.json({ pet: pet.toObject({ getters: true }) });
};

const getPetsByOwner = async (req, res, next) => {
    const ownerId = req.userData.userId;

    let pets;
    let owner;
    try {
        owner = await User.findById(ownerId, "-password").populate("pets");
    } catch (err) {
        const error = new HttpError("Could not find pets!", 500);
        return next(error);
    }

    if (!owner || owner.pets.length === 0) {
        res.json({
            message:
                "Looks like you have not registered any of your pet friends yet.",
            noPet: true,
        });
    } else {
        pets = owner.pets.map((pet) => pet.toObject({ getters: true }));

        res.json({ pets });
    }
};

/* CREATE */
const createPet = async (req, res, next) => {
    const { name, description, maxMeals, image } = req.body;

    const createdPet = new Pet({
        name,
        description,
        maxMeals,
        image,
        owner: req.userData.userId,
    });

    let owner;

    try {
        owner = await User.findById(req.userData.userId);
    } catch (err) {
        const error = new HttpError("Create pet failed 1", 500);

        return next(err);
    }

    if (!owner) {
        const error = new HttpError("Could not find owner.", 404);
        return next(error);
    }

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await createdPet.save({ session: sess });

        owner.pets.push(createdPet); // NOTE: mongoose behind the scenes established the connection and saves. only the id is saved to mpngo

        await owner.save({ session: sess });

        await sess.commitTransaction();
    } catch (err) {
        const error = new HttpError("Create pet failed 2", 500);

        return next(error);
    }

    res.status(201).json(createdPet);
};

/* DELETE */
const deletePet = async (req, res, next) => {
    const petId = req.params.petId;

    let pet;

    // Find the pet
    try {
        pet = await Pet.findById(petId).populate("owner", "-password");
    } catch (err) {
        const error = new HttpError(
            "Something went wrong. Pet not deleted",
            500
        );
        return next(error);
    }

    if (!pet) {
        const error = new HttpError(
            "Something went wrong. Could not find pet to be deleted",
            404
        );
        return next(error);
    }

    // Check that delete request is made by the owner
    if (pet.owner.id !== req.userData.userId) {
        const error = new HttpError("You are not the owner.", 401);
        return next(error);
    }

    // Delete the pet and remove it from owners list of pets.
    // TODO: Also remove all its meals.
    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();

        await pet.remove({ session: sess });

        pet.owner.pets.pull(pet);
        await pet.owner.save({ session: sess });

        await sess.commitTransaction();
    } catch (err) {
        const error = new HttpError(
            "Something went wrong. Pet  not deleted",
            500
        );
        return next(error);
    }

    res.status(200).json({ message: "Pet deleted" });
};

const deleteFamilyMember = async (req, res, next) => {
    const petId = req.params.petId;
    const { memberId } = req.query;

    // Check if a person is making a request to remove themselvs.
    const removeSelf =
        memberId === req.userData.userId ? req.userData.userId : null;

    // Check that delete request is made by the owner or person self and update family array.
    let pet;
    try {
        pet = await Pet.findOneAndUpdate(
            {
                $and: [
                    { _id: petId },
                    {
                        $or: [
                            { owner: req.userData.userId },
                            {
                                family: {
                                    $in: [removeSelf],
                                },
                            },
                        ],
                    },
                ],
            },
            { $pullAll: { family: [memberId] } },
            {
                new: true,
            }
        )
            .populate("owner", "-password -pets")
            .populate("family", "-password -pets");
    } catch (err) {
        const error = new HttpError(
            "Something went wrong. Family member not deleted",
            500
        );
        console.log(err);

        return next(err);
    }

    if (!pet) {
        const error = new HttpError(
            "Something went wrong. Could not find pet",
            404
        );
        return next(error);
    }

    res.json({ pet: pet.toObject({ getters: true }) });
};
/* UPDATE */
/* TODO Ad change owner */
const updatePet = async (req, res, next) => {
    const petId = req.params.petId;
    const { name, description, maxMeals, image } = req.body;

    // Find the pet
    let pet;
    try {
        pet = await Pet.findById(petId)
            .populate("owner", "-password -pets")
            .populate("family", "-password -pets");
    } catch (err) {
        const error = new HttpError("Something whent wrong", 500);
        return next(error);
    }

    // Check that it is the owner that is updating
    if (pet.owner._id.toString() !== req.userData.userId) {
        const error = new HttpError("You are not the owner.", 401);
        return next(error);
    }

    // Update the pet
    pet.name = name;
    pet.description = description;
    pet.maxMeals = maxMeals;
    //TODO file upload and image save
    /*  pet.image = image ; */

    try {
        await pet.save();
    } catch (err) {
        const error = new HttpError(
            "Something went wrong. Pet could not be updated.",
            500
        );
        return next(error);
    }

    res.status(200).json({ pet: pet.toObject({ getters: true }) });
};

const addFamilyMember = async (req, res, next) => {
    const petId = req.params.petId;
    const { email } = req.body;

    let pet;
    let newMember;

    // Find the pet
    try {
        pet = await Pet.findById(petId)
            .populate("owner", "-password -pets")
            .populate("family", "-password -pets");
    } catch (err) {
        const error = new HttpError("Something whent wrong", 500);
        console.log(err);

        return next(error);
    }

    // Check that request is made by the owner
    if (pet.owner.id !== req.userData.userId) {
        const error = new HttpError("You are not the owner.", 401);
        return next(error);
    }

    // Check that the new member is not the owner
    if (pet.owner.email === email) {
        const error = new HttpError(
            "Seams this user is already part of the family.",
            401
        );
        return next(error);
    }

    // Find the user to be added to the family
    try {
        newMember = await User.findOne({ email }, "-password -pets");
    } catch (err) {
        const error = new HttpError("Something went wrong", 500);
        return next(error);
    }

    if (!newMember) {
        const error = new HttpError(
            "Sorry could not find any user with that email.",
            401
        );
        return next(error);
    }

    // Check so that the user is not already in the family
    const alreadyFamily = pet.family.filter((member) => {
        return member.email === newMember.email;
    });

    if (alreadyFamily.length !== 0) {
        const error = new HttpError(
            "Seams this user is already part of the family.",
            401
        );
        return next(error);
    }

    // Add the new member

    pet.family.push(newMember);

    try {
        await pet.save();
    } catch (err) {
        const error = new HttpError(
            "Something went wrong. Pet could not be updated.",
            500
        );
        return next(error);
    }

    res.status(200).json({ pet: pet.toObject({ getters: true }) });
};

/* EXPORTS */
exports.getPetById = getPetById;
exports.getPetsByOwner = getPetsByOwner;
exports.createPet = createPet;
exports.deletePet = deletePet;
exports.updatePet = updatePet;
exports.addFamilyMember = addFamilyMember;
exports.deleteFamilyMember = deleteFamilyMember;
