import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    Card,
    CardBody,
    CardHeader,
    CardText,
    CardTitle,
    Col
} from "reactstrap";
import {
    Block,
    BlockContent,
    BlockDes,
    BlockHead,
    BlockTitle,
    Button
} from "../../components/Component";
import Head from "../../layout/head/Head";
import AuthFooter from "./AuthFooter";

const EscolhaConcierge = () => {
    const route = useParams();
    const navigate = useNavigate();

    // navigate(`/${route.hospital}/chat`)
    function WhatsApp() {
        if (route.hospital === '36980') {
            const url = `https://api.whatsapp.com/send?phone=551150394040`
            window.open(url, '_blank');
        }
        if (route.hospital === '32729') {
            const url = `https://api.whatsapp.com/send?phone=551149490104`
            window.open(url, '_blank');
        }
        if (route.hospital === '35157') {
            const url = `https://api.whatsapp.com/send?phone=557140422222`
            window.open(url, '_blank');
        }
        if (route.hospital === '36380') {
            const url = `https://api.whatsapp.com/send?phone=551142000330`
            window.open(url, '_blank');
        }
    }
    function ChatWeb() {
        navigate(`/${route.hospital}/login`)
    }

    const esconderWhatsSabara = 'S'
    const esconderWhatsSepaco = 'S'
    const esconderWhatsSantaIzabel = 'S'
    const esconderWhatsSantaCatarina = 'S'

    const esconderChatWebSabara = 'N'
    const esconderChatWebSepaco = 'N'
    const esconderChatWebSantaIzabel = 'N'
    const esconderChatWebSantaCatarina = 'N'

    let mostrarWhats = false
    if (route.hospital === '36980' && esconderWhatsSabara === 'N') { mostrarWhats = true }
    if (route.hospital === '36380' && esconderWhatsSepaco === 'N') { mostrarWhats = true }
    if (route.hospital === '35157' && esconderWhatsSantaIzabel === 'N') { mostrarWhats = true }
    if (route.hospital === '32729' && esconderWhatsSantaCatarina === 'N') { mostrarWhats = true }

    let mostrarChatWeb = false
    if (route.hospital === '36980' && esconderChatWebSabara === 'N') { mostrarChatWeb = true }
    if (route.hospital === '36380' && esconderChatWebSepaco === 'N') { mostrarChatWeb = true }
    if (route.hospital === '35157' && esconderChatWebSantaIzabel === 'N') { mostrarChatWeb = true }
    if (route.hospital === '32729' && esconderChatWebSantaCatarina === 'N') { mostrarChatWeb = true }

    return (
        <>
            <Head title="Login" />
            <Block className="nk-block-middle nk-auth-body d-flex flex-column justify-content-center wide-xs">
                <BlockHead className="pt-2 pb-4">
                    <BlockContent>
                        <BlockTitle tag="h4">Bem vindo(a) ao Concierge!</BlockTitle>
                        <BlockDes>
                            <p>Escolha um dos métodos de atendimento disponivel.</p>
                        </BlockDes>
                    </BlockContent>
                </BlockHead>
                {
                    mostrarWhats === true ?
                        <Col className='mb-3'>
                            <Card className="card-bordered">
                                <CardHeader className="border-bottom">WhatsApp</CardHeader>
                                <CardBody className="card-inner">
                                    <CardTitle tag="h5">Atendimento pelo WhatsApp</CardTitle>
                                    <CardText>Você sera redirecionado para o concierge do WhatsApp, e poderá realizar seus pedidos.</CardText>
                                    <Button color="success" onClick={() => WhatsApp()}>Ir para o WhatsApp</Button>
                                </CardBody>
                            </Card>
                        </Col> : ''
                }
                {
                    mostrarChatWeb === true ?
                        <Col className="">
                            <Card className="card-bordered">
                                <CardHeader className="border-bottom">Chat Web</CardHeader>
                                <CardBody className="card-inner">
                                    <CardTitle tag="h5">Atendimento pelo Chat Web</CardTitle>
                                    <CardText>Você sera redirecionado para o concierge do Chat Web, e poderá realizar seus pedidos.</CardText>
                                    <Button color="primary" onClick={() => ChatWeb()}>Ir para o Chat Web</Button>
                                </CardBody>
                            </Card>
                        </Col> : ''
                }
            </Block>
            <AuthFooter />
        </>
    );
};
export default EscolhaConcierge;
