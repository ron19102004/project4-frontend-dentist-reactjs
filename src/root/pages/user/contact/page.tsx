import { FC, Fragment } from "react";
import HeadUtil from "../../../../components/utils/head.util";

const ContactUserPage: FC = () => {
  return (
    <Fragment>
      <HeadUtil
        title={"Liên hệ"}
        author={"Ron"}
        urlImage={""}
        urlPageCurrent={""}
      />
      <section className="text-3xl">
        <h1>liên hệ User Page</h1>
      </section>
    </Fragment>
  );
};
export default ContactUserPage;
