import { Box, Button, Card, CardContent, CardMedia, Chip, Typography, Grid2 } from "@mui/material";
import { Bed, Bathtub, DirectionsCar, Favorite } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useAddFavoritePropertyMutation, useFetchFavoriteQuery } from "../favorite/favoriteApi";
import { useUserInfoQuery } from "../account/accountApi";

export type Property = {
    id: number;
    title: string;
    address: string;
    city: string;
    price: number;
    listingType: string; // "Buy" / "Rent"
    bedrooms: number;
    bathrooms: number;
    carSpots: number;
    description: string;
    imageUrl: string;
};

type Props = {
    property: Property;
};

export default function PropertyCard({ property }: Props) {
    const { data: user } = useUserInfoQuery();
    //const { data: favorite } = useFetchFavoriteQuery();
 const { data: favorite } = useFetchFavoriteQuery(undefined, {
        skip: !user // Only fetch favorites if user is logged in
    });
    const [addToFavorites, { isLoading }] = useAddFavoritePropertyMutation();
    const isFavorited = favorite?.favoriteItems.some(fav => fav.propertyId === property.id);
    const isLoggedIn = !!user; 
    return (
        <Card
            elevation={3}
            sx={{
                width: 320,
                borderRadius: 2,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column"
            }}
        >
            {/* Image with badge */}
            <Box sx={{ position: "relative" }}>
                <CardMedia
                    component="img"
                    height="200"
                    image={property.imageUrl}
                    alt={property.title}
                />
                <Chip
                    label={property.listingType.toUpperCase()}
                    color="error"
                    size="small"
                    sx={{
                        position: "absolute",
                        top: 8,
                        left: 8,
                        fontWeight: "bold"
                    }}
                />
            </Box>

            {/* Content */}
            <CardContent>
                <Typography variant="h6" fontWeight="bold">
                    {property.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {property.address}, {property.city}
                </Typography>

                <Typography variant="h6" sx={{ color: "secondary.main", mt: 1 }}>
                    ${property.price.toLocaleString()}
                </Typography>

                {/* Stats Row */}
                <Grid2 container spacing={2} sx={{ mt: 1, textAlign: "center" }}>
                    <Grid2 sx={{ xs: 4 }}>
                        <Box display="flex" flexDirection="column" alignItems="center">
                            <Bed fontSize="small" />
                            <Typography variant="caption">{property.bedrooms}</Typography>
                        </Box>
                    </Grid2>
                    <Grid2 sx={{ xs: 4 }}>
                        <Box display="flex" flexDirection="column" alignItems="center">
                            <Bathtub fontSize="small" />
                            <Typography variant="caption">{property.bathrooms}</Typography>
                        </Box>
                    </Grid2>
                    <Grid2 sx={{ xs: 4 }}>
                        <Box display="flex" flexDirection="column" alignItems="center">
                            <DirectionsCar fontSize="small" />
                            <Typography variant="caption">{property.carSpots}</Typography>
                        </Box>
                    </Grid2>
                </Grid2>

                {/* Buttons */}
                <Box display="flex" justifyContent="space-between" mt={2}>
                    <Button
                        size="small"
                        variant="contained"
                        color="primary"
                        component={Link}
                        to={`/property/${property.id}`}
                    >
                        View
                    </Button>
   {isLoggedIn && (
                   <Button
  size="small"
  variant="outlined"
  color="secondary"
  disabled={isLoading || isFavorited}
  onClick={() => addToFavorites({ property })}
>
  {isFavorited ? <Favorite sx={{ color: 'red' }}  /> : "Add TO Favorites"}
</Button>
   )}
                </Box>
            </CardContent>
        </Card>
    );
}
