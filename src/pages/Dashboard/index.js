import React, { useState, useMemo, useEffect } from 'react';
import {
  format,
  subDays,
  addDays,
  setHours,
  setMinutes,
  setSeconds,
  isBefore,
  parseISO,
  setMilliseconds,
  isEqual,
} from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import ptBr from 'date-fns/locale/pt-BR';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';

import {
  MdChevronLeft,
  MdChevronRight,
  MdCancel,
  MdSchedule,
  MdPhoneIphone,
  MdPhoneInTalk,
  MdAttachMoney,
  MdTune,
  MdModeEdit,
  MdDelete,
} from 'react-icons/md';
import { FaWhatsapp } from 'react-icons/fa';
import { Container, Time } from './styles';
import api from '~/services/api';

const range = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];

export default function Darshboard() {
  const [schedule, setSchedule] = useState([]);
  const [date, setDate] = useState(new Date());
  const [modal, setModal] = useState(false);
  const [scheduled, setScheduled] = useState(null);

  const dateFormatted = useMemo(
    () => format(date, "d 'de' MMMM", { locale: ptBr }),
    [date]
  );

  const handleDeleteAppointment = async (id) => {
    let response;
    try {
      response = await api.delete(`/v1/appointments/${id}`);

      const scheduleDeleted = schedule.map((p) => {
        if (p.appointment && p.appointment.id === id) {
          p.appointment.canceled_at = response.data.data.canceled_at;
        }

        return p;
      });

      setSchedule(scheduleDeleted);
      setModal(false);
    } catch (error) {
      console.tron.log(error);
      alert(`Error não foi possível canceldar agendamento`);
      setModal(false);
    }
  };

  useEffect(() => {
    const loadSchedule = async () => {
      const response = await api.get('/v1/schedule', {
        params: { date },
      });

      // Pegando a timezone do navegador
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      // add mais informações aos agendamentos
      const data = range.map((hour) => {
        const checkDate = setMilliseconds(
          setSeconds(setMinutes(setHours(date, hour), 0), 0),
          0
        );
        const compareDate = utcToZonedTime(checkDate, timezone);
        return {
          time: `${hour}:00h`,
          past: isBefore(compareDate, new Date()),
          appointment: response.data.find((a) =>
            isEqual(parseISO(a.date), compareDate)
          ),
        };
      });

      setSchedule(data);
    };

    loadSchedule();
  }, [date]);

  function handlePrevDay() {
    setDate(subDays(date, 1));
  }

  function handleNextDay() {
    setDate(addDays(date, 1));
  }

  function toggeShowModal(props) {
    setModal(true);
    console.tron.log(props);
  }

  function toggeCloseModal() {
    setModal(false);
  }

  return (
    <Container>
      <header>
        <button type="button">
          <MdChevronLeft size={36} color="#BFBFBF" onClick={handlePrevDay} />
        </button>
        <strong>{dateFormatted}</strong>
        <button type="button">
          <MdChevronRight size={36} color="#BFBFBF" onClick={handleNextDay} />
        </button>
      </header>
      <ul>
        {schedule.map((time) => (
          <Time
            key={time.time}
            past={time.past}
            available={!time.appointment || time.appointment.canceled_at}
            onClick={() => {
              // if (!time.appointment) return;
              setScheduled(time);
              toggeShowModal(time);
            }}
          >
            <strong>{time.time}</strong>
            <span>
              {time.appointment ? time.appointment.profiles.name : 'Em aberto'}
            </span>
            <span />
          </Time>
        ))}
      </ul>
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
            AGENDAMENTO | Data
            {scheduled && scheduled.time}
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
              ? scheduled.appointment.service_provider_id
              : null}
          </p>
          <p>Descrição: Maquiagem fina e especial, com os melhores produtos!</p>
          <p>Observaçõs: Maquiagem de Noiva</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={toggeCloseModal}>
            <MdAttachMoney color="#eee" size={20} style={{ marginRight: 5 }} />
            Venda
          </Button>
          <Button variant="success" onClick={toggeCloseModal}>
            <FaWhatsapp color="#eee" size={20} style={{ marginRight: 5 }} />
            WhatsApp
          </Button>
          <Button variant="warning" onClick={toggeCloseModal}>
            <MdModeEdit color="#eee" size={20} style={{ marginRight: 5 }} />
            Alterar
          </Button>
          {scheduled && scheduled.appointment && (
            <Button
              variant="danger"
              onClick={() =>
                handleDeleteAppointment(
                  scheduled.appointment && scheduled.appointment.id
                )
              }
            >
              <MdDelete color="#eee" size={20} style={{ marginRight: 5 }} />
              Deletar
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
