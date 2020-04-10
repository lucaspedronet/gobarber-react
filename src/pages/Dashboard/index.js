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

import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { Modal } from '@material-ui/core';
import { Container, Time } from './styles';
import api from '~/services/api';

const range = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];

export default function Darshboard() {
  const [schedule, setSchedule] = useState([]);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const dateFormatted = useMemo(
    () => format(date, "d 'de' MMMM", { locale: ptBr }),
    [date]
  );

  useEffect(() => {
    async function loadSchedule() {
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
    }

    loadSchedule();
  }, [date]);

  function handlePrevDay() {
    setDate(subDays(date, 1));
  }

  function handleNextDay() {
    setDate(addDays(date, 1));
  }

  function handleOpen() {
    setOpen(!open);
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

      <Modal
        open={open}
        onClose={handleOpen}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <p>Testando</p>
      </Modal>

      <ul>
        {schedule.map((time) => (
          <Time
            key={time.time}
            past={time.past}
            available={!time.appointment}
            onClick={handleOpen}
          >
            <strong>{time.time}</strong>
            <span>
              {time.appointment ? time.appointment.profiles.name : 'Em aberto'}
              <br />
              {time.appointment ? time.appointment.profiles.phone : ''}
            </span>
            <span />
          </Time>
        ))}
      </ul>
    </Container>
  );
}
