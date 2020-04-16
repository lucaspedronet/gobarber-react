import React from 'react';
import { Modal, Button, Row, Col, Container } from 'react-bootstrap';
import { MdAttachMoney, MdModeEdit, MdDelete } from 'react-icons/md';
import { FaWhatsapp } from 'react-icons/fa';
import PropTypes from 'prop-types';

import { store } from '~/store';

// import { Container } from './styles';

function ModalAppointment({
  scheduled,
  modal,
  toggeCloseModal,
  removeSchedule,
}) {
  const { scheduleFormatted } = store.getState().schedule;
  console.tron.log(scheduled);
  return (
    <Modal
      show={modal}
      onHide={toggeCloseModal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      restoreFocus
    >
      <Modal.Header closeButton>
        <Modal.Title>DETALHES DE AGENDAMENTO</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row className="show-grid" style={{ border: 'solid 1px #333' }}>
            <Col xs={12} md={6} style={{ border: 'solid 1px #F35' }}>
              <code>.col-xs-12 .col-md-8</code>
            </Col>
            <Col xs={12} md={6} style={{ border: 'solid 1px #F93' }}>
              <code>.col-xs-6 .col-md-4</code>
            </Col>
          </Row>
          <h4>
            {scheduled && scheduled.appointment
              ? scheduled.appointment.profiles.name
              : null}
          </h4>
          <p>
            Serviço:{' '}
            {scheduled && scheduled.appointment
              ? scheduled.appointment.service.title
              : null}
          </p>
          <p>
            Descrição:{' '}
            {scheduled && scheduled.appointment
              ? scheduled.appointment.service.description
              : null}
          </p>
          <p>
            Telefone:{' '}
            {scheduled && scheduled.appointment
              ? scheduled.appointment.profiles.phone
              : null}
          </p>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="dark">
          <MdAttachMoney color="#eee" size={20} style={{ marginRight: 5 }} />
          Venda
        </Button>
        <Button variant="success">
          <FaWhatsapp color="#eee" size={20} style={{ marginRight: 5 }} />
          WhatsApp
        </Button>
        <Button variant="warning" onClick={toggeCloseModal}>
          <MdModeEdit color="#eee" size={20} style={{ marginRight: 5 }} />
          Editar horário
        </Button>
        {scheduled && scheduled.appointment && (
          <Button variant="danger" onClick={removeSchedule}>
            <MdDelete color="#eee" size={20} style={{ marginRight: 5 }} />
            Cancelar horário
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}

ModalAppointment.propTypes = {
  scheduled: PropTypes.shape({
    appointment: PropTypes.shape({
      profiles: PropTypes.shape({
        name: PropTypes.string,
        phone: PropTypes.string,
      }),
      service: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
      }),
    }).isRequired,
  }).isRequired,
  toggeCloseModal: PropTypes.func.isRequired,
  removeSchedule: PropTypes.func.isRequired,
  modal: PropTypes.bool.isRequired,
};

export default ModalAppointment;
