import { useAppDispatch, useAppSelector } from "../../app/store/store";
import { Grid2, Typography } from "@mui/material";
import AppPagination from "../../app/shared/components/AppPagination";
import PropertyFilters from "./PropertyFilters";
import PropertyList from "./PropertyList";
import { setPageNumber } from "./propertySlice";
import { useLazyFetchPropertiesQuery, useLazyFetchPropertyFiltersQuery } from "./propertyApi";
import { useEffect } from "react";


export default function PropertyPage() {

  const productParams = useAppSelector(state => state.property);
  const [triggerFetchProperties, {data, isLoading: propertyLoading}] 
    = useLazyFetchPropertiesQuery();
  const [triggerFetchPropertyFilters, {data: filtersData, isLoading: filtersLoading}] 
    = useLazyFetchPropertyFiltersQuery()
  const dispatch = useAppDispatch();

  useEffect(() => {
    triggerFetchProperties(productParams);
    triggerFetchPropertyFilters();
  }, [triggerFetchPropertyFilters, triggerFetchProperties, productParams])

  if (propertyLoading || filtersLoading || !data || !filtersData) 
    return <div>Loading...</div>

  return (
     <Grid2 container spacing={4}>
      <Grid2 size={3}>
        <PropertyFilters data={filtersData} />
      </Grid2>
      <Grid2 size={9}>
        {data.items && data.items.length > 0 ? (
          <>
            <PropertyList properties={data.items} />
            <AppPagination
              metadata={data.pagination}
              onPageChange={(page: number) => {
                dispatch(setPageNumber(page));
                window.scrollTo({top: 0, behavior: 'smooth'})
              }}
            />
          </>
        ) : (
          <Typography variant="h5">There are no results for this filter</Typography>
        )}
      </Grid2>
    </Grid2>
  )
}