import { Box, Button, Paper, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import RadioButtonGroup from "../../app/shared/components/RadioButtonGroup";
import CheckboxButtons from "../../app/shared/components/CheckboxButtons";
import PropertySearch from "./PropertySearch";
import { resetParams, setCity, setListingTypes, setOrderBy } from "./propertySlice";


const sortOptions = [
    { value: 'title', label: 'Alphabetical' },
    { value: 'priceDesc', label: 'Price: High to low' },
    { value: 'price', label: 'Price: Low to high' },
]

type Props = {
    data: {city: string[]; listingType: string[];}
}

export default function PropertyFilters({data}: Props) {
    
    const { orderBy, listingType, city } = useAppSelector(state => state.property);
        const dispatch = useAppDispatch();
    
        if (!data?.city || !data.listingType) return <Typography>Loading.....</Typography>
    
        
  return (
    <Box display='flex' flexDirection='column' gap={3}>
            <Paper>
                <PropertySearch />
            </Paper>
            <Paper sx={{ p: 3 }}>
                <RadioButtonGroup
                    selectedValue={orderBy}
                    options={sortOptions}
                    onChange={e => dispatch(setOrderBy(e.target.value))}
                />
            </Paper>
            <Paper sx={{ p: 3 }}>
                <CheckboxButtons
                    items={data.city}
                    checked={city}
                    onChange={(items: string[]) => dispatch(setCity(items))}
                />
            </Paper>
            <Paper sx={{ p: 3 }}>
                <CheckboxButtons
                    items={data.listingType}
                    checked={listingType}
                    onChange={(items: string[]) => dispatch(setListingTypes(items))}
                />
            </Paper>
            <Button onClick={() => dispatch(resetParams())}>Reset filters</Button>
        </Box>
  )
}