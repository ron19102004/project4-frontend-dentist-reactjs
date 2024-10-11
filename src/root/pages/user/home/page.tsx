import { FC, Fragment } from "react";
import HeadUtil from "../../../../components/utils/head.util";

const HomeUserPage: FC = () => {
  return (
    <Fragment>
      <HeadUtil
        title={"Trang chủ"}
        author={"Ron"}
        urlImage={""}
        urlPageCurrent={""}
      />
      <section>
        <h1>Home User Page</h1>
      </section>
    </Fragment>
  );
};
export default HomeUserPage;
