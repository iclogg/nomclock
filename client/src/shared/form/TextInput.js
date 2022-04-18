import { TextField, Grid } from "@mui/material";

export const TextInput = ({
    label,
    name,
    value,
    onChange,
    type,
    error = null,
    item = true,
    ...other
}) => {
    if (type === "number") {
        return (
            <Grid item={item} xs={12}>
                <TextField
                    margin="normal"
                    fullWidth
                    variant="outlined"
                    label={label}
                    name={name}
                    value={value}
                    onChange={onChange}
                    type="number"
                    error={!!error}
                    helperText={error}
                    {...other}
                    id="outlined-number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                ></TextField>
            </Grid>
        );
    }

    return (
        <Grid item={item} xs={12}>
            <TextField
                margin="normal"
                fullWidth
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
        </Grid>
    );
};

export default TextInput;
