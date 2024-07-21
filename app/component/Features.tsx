import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {CardActions} from "@mui/material";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";

interface FeaturesProps {
    title: string;
    description: string;
    img: string;
}

const Features: React.FC<FeaturesProps> = ({title, description, img}) => {
    return (
        <Card
            // sx={{ maxWidth: {sm:500, md: 477}, height: 350 }}
        >
            <CardActionArea>
                <CardMedia
                    sx={{ height: 140 }}
                    image={img}
                    title="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Share</Button>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </CardActionArea>
        </Card>
    );
}

export default Features;