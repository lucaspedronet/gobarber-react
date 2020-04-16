import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { MdAttachMoney, MdModeEdit, MdDelete } from 'react-icons/md';
import { FaWhatsapp } from 'react-icons/fa';

import { store } from '~/store';

// import { Container } from './styles';

function ModalAppointment({
  scheduled,
  modal,
  toggeCloseModal,
  removeSchedule,
}) {
  const { scheduleFormatted } = store.getState().schedule;
  // console.tron.log(scheduleFormatted);
  console.tron.log(scheduled);
  return (
    <Modal
      show={modal}
      onHide={toggeCloseModal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      // data={scheduled}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          DETALHES DE AGENDAMENTO
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
          Alterar
        </Button>
        {scheduled && scheduled.appointment && (
          <Button variant="danger" onClick={removeSchedule}>
            <MdDelete color="#eee" size={20} style={{ marginRight: 5 }} />
            Deletar
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}

export default ModalAppointment;