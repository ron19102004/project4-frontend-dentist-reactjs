import * as React from "react";
import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import FormatText from "@/components/ui/format-text";
import assets from "@/assets";
import LoadingLine from "./loadline.ui";
import theme from "@/helper/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Service } from "@/apis/models";

interface ScrollDialogProps {
  isOpen: boolean;
  id: number;
}

const ScrollDialog: React.FC<ScrollDialogProps> = ({ isOpen, id }) => {
  const [open, setOpen] = React.useState<boolean>(isOpen);
  const [scroll, setScroll] = React.useState<DialogProps["scroll"]>("paper");

  const [serviceDetail, setServiceDetail] = useState<Service | null>(null);

  const fetchServiceDetail = useCallback(async () => {
    try {
      // const newService = await HomeControllerUser.getServiceDetail(id);
      // setServiceDetail(newService);
    } catch (error) {
      console.error("Error fetching service:", error);
    }
  }, [id]); // Chỉ gọi khi `id` thay đổi

  useEffect(() => {
    if (id) {
      fetchServiceDetail();
    }
  }, [id, fetchServiceDetail]); // Call API khi `id` thay đổi

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const descriptionElementRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <React.Fragment>
        <Dialog
          open={open}
          onClose={handleClose}
          scroll={scroll}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <DialogTitle
            id="scroll-dialog-title"
            className={cn(
              "text-my_color_primary font-semibold font-bold text-center"
            )}
          >
            <div>{serviceDetail?.name || <LoadingLine></LoadingLine>}</div>
          </DialogTitle>

          <DialogContent dividers={scroll === "paper"}>
            <DialogContentText
              id="scroll-dialog-description"
              ref={descriptionElementRef}
              tabIndex={-1}
            >
              <img
                src={serviceDetail?.poster || assets.BSStoneHome}
                alt="service-image"
                className="pb-4 w-full object-cover"
              />
              <FormatText
                text={serviceDetail?.description || "Loading details..."}
              />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button className="font" onClick={handleClose}>
              THOÁT
            </Button>
            <Button onClick={handleClose}>ĐẶT LỊCH HẸN</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </ThemeProvider>
  );
};

export default ScrollDialog;
