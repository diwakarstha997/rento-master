import React from "react";

const Breadcrumb = ({ path, base }) => {
  const routes = path.split("/");
  routes.shift();
  return (
    <ol className="breadcrumb mx-5">
      {routes.map((route) => (
        <li key={route} className="breadcrumb-item">
          <a
            className="text-dark"
            href={
              base && route !== base ? "/" + base + "/" + route : "/" + route
            }
          >
            <span>{route}</span>
          </a>
        </li>
      ))}
    </ol>
  );
};

export default Breadcrumb;
