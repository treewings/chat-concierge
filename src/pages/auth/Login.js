import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, Form, Spinner } from "reactstrap";
import {
  Block,
  BlockContent,
  BlockDes,
  BlockHead,
  BlockTitle,
  Button,
  Icon,
  PreviewCard,
} from "../../components/Component";
import Head from "../../layout/head/Head";
import AuthFooter from "./AuthFooter";
import { getLogoHospital } from "../../utils/Utils";
import { useNavigate, useParams } from "react-router-dom";
import InputMask from "react-input-mask";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [errorVal, setError] = useState("");

  const route = useParams();
  const navigate = useNavigate();

  const onFormSubmit = async (formData) => {
    setLoading(true);
    localStorage.setItem("telefone", formData.telefone.replace(/\D/g, ""));
    if (localStorage.getItem("telefone")) {
      navigate(`/${route.hospital}/chat`)
    }
    setLoading(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <>
      <Head title="Login" />
      <Block className="nk-block-middle nk-auth-body d-flex flex-column justify-content-center wide-xs">
        <div className="brand-logo pb-4 text-center" style={{marginTop: '25%'}}>

          <div className="logo-link">
            <img className="logo-light logo-img logo-img-lg" src={getLogoHospital(route.hospital)} alt="logo" />
            <img className="logo-dark logo-img logo-img-lg" src={getLogoHospital(route.hospital)} alt="logo-dark" />
          </div>

        </div>

        <PreviewCard className="card-bordered" bodyClass="card-inner-lg">
          <BlockHead className="pt-2 pb-4">
            <BlockContent>
              <BlockTitle tag="h4">Olá, seja bem vindo(a) ao Concierge!</BlockTitle>
              <BlockDes>
                <p>Para iniciar o atendimento, insira o seu número de telefone.</p>
              </BlockDes>
            </BlockContent>
          </BlockHead>
          {errorVal && (
            <div className="mb-3">
              <Alert color="danger" className="alert-icon">
                <Icon name="alert-circle" /> Unable to login with credentials{" "}
              </Alert>
            </div>
          )}
          <Form className="is-alter" onSubmit={handleSubmit(onFormSubmit)}>
            <div className="form-group">
              <div className="form-label-group">
                <label className="form-label" htmlFor="default-01">
                  Número de Telefone
                </label>
              </div>
              <div className="form-control-wrap">
                <InputMask 
                  mask="(99) 99999-9999" 
                  placeholder="(99) 99999-9999" 
                  className="form-control-lg form-control"
                  {...register("telefone", { required: "Este campo é obrigatório" })} 
                  id="default-01"/>
                {errors.telefone && <span className="invalid">{errors.telefone.message}</span>}
              </div>
            </div>
            <div className="form-group">
              <Button size="lg" className="btn-block" type="submit" color="primary">
                {loading ? <Spinner size="sm" color="light" /> : "Iniciar Atendimento"}
              </Button>
            </div>
          </Form>
        </PreviewCard>
      </Block>
      <AuthFooter />
    </>
  );
};
export default Login;
