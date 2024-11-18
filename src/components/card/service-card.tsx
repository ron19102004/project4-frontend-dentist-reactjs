import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { cn } from "@/lib/cn";
import ScrollDialog from "../ui/scroll-dialog";
import assets from "@/assets";
import { Service } from "@/apis/models";

const ServiceCard: React.FC<Service> = ({
  id,
  name,
  description,
  price,
  poster,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const handleCardClick = () => {
    setOpen(!open);
  };

  return (
    <Card
      onClick={handleCardClick}
      sx={{ maxWidth: 400 }}
      className="transition-transform duration-200 transform hover:scale-102 hover:shadow-xl cursor-pointer"
    >
      <CardMedia
        sx={{ height: 300 }}
        image={poster || assets.BSStoneHome} // Hiển thị poster nếu có, nếu không sẽ dùng ảnh mặc định
        title="service"
        className="transition-transform duration-200 transform hover:scale-102"
      />
      <CardContent>
        <div className={cn("pb-3 text-lg font-bold")}>{name}</div>
        <div
          style={{
            color: "gray",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {description}
        </div>
      </CardContent>
      <CardActions className="flex justify-between items-center w-full">
        <Button size="large">ĐĂNG KÝ</Button>
        <span
          className={cn(
            "text-lg text-white bg-my_color_primary py-1 px-2 rounded-sm"
          )}
        >
          {price} VND
        </span>
      </CardActions>
      <ScrollDialog isOpen={open} id={id}></ScrollDialog>
    </Card>
  );
};

export default ServiceCard;
