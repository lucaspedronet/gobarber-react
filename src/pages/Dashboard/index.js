/* eslint-disable import/no-useless-path-segments */
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
  isToday,
  getISODay,
} from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import ptBr from 'date-fns/locale/pt-BR';
// import Modal from 'react-bootstrap/Modal';
import { MdChevronRight, MdChevronLeft } from 'react-icons/md';
import { FaWhatsapp } from 'react-icons/fa';
import { toast } from 'react-toastify';
import ModalAppointment from '~/components/ModalAppointment';
import { Container, Time } from './styles';
import api from '~/services/api';
import { week } from '~/utils/constants/week';
import { store } from '~/store';

export default function Darshboard() {
  const [schedule, setSchedule] = useState([]);
  const [date, setDate] = useState(new Date());
  const [modal, setModal] = useState(true);
  const [scheduled, setScheduled] = useState(null);

  const { loading } = store.getState().schedule;

  const dateFormatted = useMemo(
    () => format(date, "d 'de' MMMM", { locale: ptBr }),
    [date]
  );

  const weekDay = useMemo(() => week.find((d) => d.key === getISODay(date)), [
    date,
  ]);

  // const scheduleFormatted = useMemo(
  //   () => dispatch(scheduleFormattedSuccess(schedule)),
  //   [schedule, dispatch]
  // );

  useEffect(() => {
    const loadSchedule = async () => {
      try {
        const [appointments, schedules] = await Promise.all([
          api.get('/v1/schedule', {
            params: { date },
          }),
          api.get('/v1/providers/available', {
            params: { date: date.getTime() },
          }),
        ]);

        const { scheduleWeek } = schedules.data;

        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

        if (scheduleWeek.length > 0) {
          const data = scheduleWeek.map((time) => {
            const [hour, minute] = time.split(':');
            const checkDate = setMilliseconds(
              setSeconds(setMinutes(setHours(date, hour), minute), 0),
              0
            );
            const compareDate = utcToZonedTime(checkDate, timezone);
            return {
              time: `${hour}:${minute}`,
              past: isBefore(compareDate, new Date()),
              appointment: appointments.data.find((a) =>
                isEqual(parseISO(a.date), compareDate)
              ),
            };
          });

          // dispatch(scheduleFormattedSuccess(data));
          return setSchedule(data);
        }

        return setSchedule([]);
      } catch (error) {
        toast.error(
          'Falha, não foi possível carregar sua agenda, verifique sua conexão!'
        );
        return error;
      }
    };

    loadSchedule();
  }, [date]);

  function handlePrevDay() {
    setDate(subDays(date, 1));
  }

  function handleNextDay() {
    setDate(addDays(date, 1));
  }

  async function removeSchedule(id) {
    let response;
    try {
      response = await api.delete(`/v1/appointments/${id}`);
      const newSchedule = schedule.map((p) => {
        if (p.appointment && p.appointment.id === id) {
          p.appointment.canceled_at = response.data.data.canceled_at;
        }

        return p;
      });

      setSchedule(newSchedule);
      setModal(false);
    } catch (error) {
      alert(error.message);
      setModal(false);
      toast.error('ERRO, não foi possível cancelar o agendamento!');
    }
  }

  return (
    <Container>
      <header>
        <button type="button">
          <MdChevronLeft size={36} color="#BFBFBF" onClick={handlePrevDay} />
        </button>
        <strong>
          {(isToday(date) && 'Hoje') || weekDay.value.week}, {dateFormatted}
        </strong>
        <button type="button">
          <MdChevronRight size={36} color="#BFBFBF" onClick={handleNextDay} />
        </button>
      </header>
      <ul>
        {schedule.length >= 0 &&
          schedule.map((time) => (
            <Time
              key={time.time}
              past={time.past}
              available={!time.appointment || time.appointment.canceled_at}
              onClick={() => {
                setScheduled(time);
                setModal(!modal);
              }}
            >
              <strong>{time.time}</strong>
              <span>
                {time.appointment
                  ? time.appointment.profiles.name
                  : 'Em aberto'}
              </span>
              <span />
            </Time>
          ))}
      </ul>
      {schedule.length <= 0 && (
        <Time style={{ alignContent: 'center' }}>
          <strong>Sem agenda!</strong>
        </Time>
      )}
      {loading && (
        <Time style={{ alignContent: 'center' }}>
          <strong>Carregando...</strong>
        </Time>
      )}
      {modal && (
        <ModalAppointment
          modal={modal}
          scheduled={scheduled}
          removeSchedule={() => removeSchedule(scheduled.appointment.id)}
          toggeCloseModal={() => setModal(false)}
        />
      )}
    </Container>
  );
}
