import React from 'react';
import {Card,CardContent,Typography} from '@material-ui/core'

const InfoBox = ({title,cases,total}) => {
    return (
        <Card className="infoBox" >
        <CardContent>
        {/* Title*/}
        <Typography className="infoBox_title" color="textSecondary" >
        
        {title}
        
        </Typography>


        {/*Number of Cases*/}
<h2 className="infoBox_cases" > {cases} </h2>

        {/* 1.2 Million*/}

        <Typography className="infoBox_total" color="textSecondary" >
        {total}
        </Typography>
        
        </CardContent>
        
        </Card>
    )
}

export default InfoBox
