
import { useParams } from "react-router-dom";
import { useFetchPropertyDetailsQuery } from "./propertyApi";
import {  Divider, Grid2, Table, TableBody, TableCell, TableContainer, TableRow,  Typography } from "@mui/material";


export default function PropertyDetails() {
    const { id } = useParams();


    
 
      const {data: property, isLoading} = useFetchPropertyDetailsQuery(id ? +id : 0)
    
      if (!property || isLoading) return <div>Loading...</div>
    
     
    
 
      const propertyDetails = [
        { label: 'Title', value: property.title },
        { label: 'Description', value: property.description },
        { label: 'ListingType', value: property.listingType },
        { label: 'City', value: property.city },
        { label: 'Bedrooms', value: property.bedrooms },
      ]
    
      
  return (
     <Grid2 container spacing={6} maxWidth='lg' sx={{ mx: 'auto' }}>
      <Grid2 size={6}>
        <img src={property?.imageUrl} alt={property.title} style={{ width: '100%' }} />
      </Grid2>
      <Grid2 size={6}>
        <Typography variant="h3">{property.title}</Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="h4" color='secondary'>${(property.price / 100).toFixed(2)}</Typography>
        <TableContainer>
          <Table sx={{
            '& td': {fontSize: '1rem'}
          }}>
            <TableBody>
              {propertyDetails.map((detail, index) => (
                <TableRow key={index}>
                  <TableCell sx={{fontWeight: 'bold'}}>{detail.label}</TableCell>
                  <TableCell>{detail.value}</TableCell>
                </TableRow>
              ))}

            </TableBody>
          </Table>
        </TableContainer>
       
      </Grid2>
    </Grid2>
  )
}