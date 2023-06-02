import React from "react";
import FieldsBtn from './FieldsBtn';
import Card from '@mui/material/Card';
import { DisplayData } from "./DisplayData";
import CardContent from '@mui/material/CardContent';

//Matt will come back and fix the prop type here
const QueryCard = (props: any) => {
  //console.log('queryCard Data -->', props.type)
  return (
    <>
      <div className="m-1 p-1 border-2" style={{ width: '250px' }}>
             <>
              <Card className='query-card' sx={{ minWidth: 200, border: '1px solid black', width: 1/8 }}>
                <CardContent>
                  <div>
                    <FieldsBtn result={props.type} />
                   </div>
                </CardContent>
              </Card>
            </>
      </div>
    </>
  );
};

// <FieldsBtn result={props.type.name} />
export default QueryCard;