import { Box } from "@mui/material";
import type { Property } from "./PropertyCard";
import PropertyCard from "./PropertyCard";


type Props ={
properties: Property[];
}


export default function PropertyList({properties}:Props) {
  return (
     <Box sx={{display:'flex', flexWrap:'wrap', gap:3,
          justifyContent:'center'}}>
        {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          
        ))}
      </Box>    
  )
}