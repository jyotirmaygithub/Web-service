import React from "react";
import Inputs from "../components/input-fields";
import Table from "../layout/Table";
import Heading from "../components/heading"

export default function FrontPage() {
  return (
    <div className="flex-col">
      <div>
        <Heading heading={"Securely store your information with ease!."}/>
      </div>
      <div className="flex flex-wrap justify-around items-start my-5">
        <Inputs />
        <Table />
      </div>
    </div>
  );
}
