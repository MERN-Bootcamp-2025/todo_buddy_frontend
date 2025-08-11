import type { Component, } from 'react';import React from "react";
import CardComponent from "../CardComponent";



const PageNotFound: React.FC<Component> = () => {
  

  return (
  <CardComponent className="max-w-md mx-auto mt-20 p-6 bg-white shadow-lg rounded-lg">
    <CardComponent.Header>
      <CardComponent.Header.Title className="text-2xl font-bold text-center">   Page Not Found</CardComponent.Header.Title>             
    </CardComponent.Header>
    <CardComponent.Body>
      <p className="text-gray-600 text-center mt-4">
        The page you are looking for does not exist or has been moved.
      </p>
      <p className="text-gray-600 text-center mt-2">
        Please check the URL or return to the homepage.
      </p>
    </CardComponent.Body>
    <CardComponent.Footer>
      <div className="flex justify-center mt-4">
        <a href="/" className="text-blue-600 hover:underline">
          Go to Homepage
        </a>
      </div>
    </CardComponent.Footer>
  </CardComponent>
  );
};

export default PageNotFound;
