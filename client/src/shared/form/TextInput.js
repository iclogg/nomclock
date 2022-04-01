import TextField from "@mui/material/TextField";

export const TextInput = ({ label, name, value, onChange, type }) => {
    /*    const typeObj = type === "number" ? `type="number" InputLabelProps={{shrink: true,}}` : ""}; */

    const inputStyle = {
        margin: "5px",
    };

    if (type === "number") {
        return (
            <TextField
                style={inputStyle}
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
            style={inputStyle}
            variant="outlined"
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            type={type}
        ></TextField>
    );
};

export default TextInput;
