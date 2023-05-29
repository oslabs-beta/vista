import React from "react";
import FieldsBtn from './FieldsBtn';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { DisplayData } from "./DisplayData";



const QueryCard = (props: any) => {

  console.log('this is from QueryCard', props.data)
  return (
    <Card className='query-card' sx={{ minWidth: 125, border: '1px solid black' }}>
      <CardContent>
        <FieldsBtn 
        fields={props.fields}
        //type={type}
        data={props.data}
        />
      </CardContent>
      <CardActions>
        <Button size="small">View more</Button>
      </CardActions>
    </Card>
 );
 
}

export default QueryCard;






        {/* <FieldsBtn  > 
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Schema:
          </Typography>
        </FieldsBtn>
        <Typography variant="h5" component="div">
          Type Name
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Types:
        </Typography>
        <Typography variant="body2">
          Description can go here.
        </Typography>
        <Typography variant="body2">
          Field Data can go here
        </Typography> */}