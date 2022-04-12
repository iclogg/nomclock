import TextField from "@mui/material/TextField";

export const TextInput = ({
    label,
    name,
    value,
    onChange,
    type,
    error = null,
    ...other
}) => {
    /*    const typeObj = type === "number" ? `type="number" InputLabelProps={{shrink: true,}}` : ""}; */

    const inputStyle = {
        margin: "10px",
        width: "400px",
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
                error={!!error}
                helperText={error}
                {...other}
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
            error={!!error}
            helperText={error}
            {...other}
        ></TextField>
    );
};

export default TextInput;
