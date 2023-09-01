import React from "react";
import ErrorImage from "../../images/gfx/error-404.svg";
import { Link } from "react-router-dom";
import { Block, BlockContent, Button } from "../../components/Component";

const Error404Modern = () => {
  return (
    <>
      <Block className="nk-block-middle wide-md mx-auto">
        <BlockContent className="nk-error-ld text-center">
          <img className="nk-error-gfx" src={ErrorImage} alt="error" />
          <div className="wide-xs mx-auto">
            <h3 className="nk-error-title">Ops! Por que você está aqui?</h3>
            <p className="nk-error-text">
            Sentimos muito pelo inconveniente. Parece que você está tentando acessar uma página que foi excluída ou que nunca existiu.
            </p>
          </div>
        </BlockContent>
      </Block>
    </>
  );
};
export default Error404Modern;
