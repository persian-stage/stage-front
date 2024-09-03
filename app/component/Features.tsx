import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Image from "next/image";

interface FeaturesProps {
    title: string;
    description: string;
    img: string;
}

const Features: React.FC<FeaturesProps> = ({title, description, img}) => {
    return (
        <Card sx={{ maxWidth: {sm:500, md: 477} }}>
            <CardActionArea>
                <Image
                    src={img}
                    alt="green iguana"
                    width={100}
                    height={50}
                    layout="responsive"
                    objectFit="cover"
                    loading="eager"
                    quality={70}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default Features;