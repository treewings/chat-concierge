import React from "react";
import { Row, Col } from "../../components/Component";

const AuthFooter = () => {
  return (
    <div className="nk-footer nk-auth-footer-full" style={{position: 'absolute', bottom: 0, width: '100%'}}>
      <div className="container wide-lg">
        <Row className="g-3">
          <Col lg="12">
            <div className="nk-block-content text-center text-lg-start">
              <p className="text-soft">&copy; 3Wings. Todos os direitos reservados.</p>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default AuthFooter;
