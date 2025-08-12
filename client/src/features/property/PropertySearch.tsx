import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import { debounce, TextField } from "@mui/material";
import { setSearchTerm } from "./propertySlice";



export default function PropertySearch() {
    const {searchTerm} = useAppSelector(state => state.property);
    const dispatch = useAppDispatch();
    const [term, setTerm] = useState(searchTerm);

    useEffect(() => {
        setTerm(searchTerm)
    }, [searchTerm]);

    const debouncedSearch = debounce(event => {
        dispatch(setSearchTerm(event.target.value))
    }, 500)

  return (
     <TextField
                label='Search properties'
                variant="outlined"
                fullWidth
                type="search"
                value={term}
                onChange={e => {
                    setTerm(e.target.value);
                    debouncedSearch(e);
                }}
            />
  )
}