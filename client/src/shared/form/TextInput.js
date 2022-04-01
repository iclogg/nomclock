import TextField from "@mui/material/TextField";

export const TextInput = ({ label, name, value, onChange, type }) => {
    /*    const typeObj = type === "number" ? `type="number" InputLabelProps={{shrink: true,}}` : ""}; */

    if (type === "number") {
        return (
            <TextField
                variant="outlined"
                label={label}
                name={name}
                value={value}
                onChange={onChange}
                type="number"
                id="outlined-number"
                InputLabelProps={{
                    shrink: true,
                }}
            ></TextField>
        );
    }

    return (
        <TextField
            variant="outlined"
            label={label}
            name={name}
            value={value}
            onChange={onChange}
        ></TextField>
    );
};

export default TextInput;
