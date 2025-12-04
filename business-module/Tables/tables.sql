CREATE TABLE SYSTEMUSERS (
  SystemUserCode    NUMBER(10)     PRIMARY KEY,
  first_name  VARCHAR2(50)   NOT NULL,
  last_name   VARCHAR2(50)   NOT NULL,
  email       VARCHAR2(100)  NOT NULL UNIQUE,
  birthday    DATE,
  account_id  NUMBER(10),
  pass VARCHAR2(100) NOT NULL
);

CREATE TABLE DRIVER (
  driver_id        NUMBER(10)     PRIMARY KEY,
  name             VARCHAR2(100)  NOT NULL,
  license_number   VARCHAR2(50)   NOT NULL UNIQUE,
  experience_years NUMBER(3)      -- anos de experiência
);

CREATE TABLE VEHICLE (
  vehicle_id NUMBER(10)     PRIMARY KEY,
  plate      VARCHAR2(20)   NOT NULL UNIQUE,
  capacity   NUMBER(5),
  status     VARCHAR2(20),  -- ex: 'active', 'maintenance'
  line_id    NUMBER(10),    -- id da linha (pode corresponder ao Neo4j)
  type       VARCHAR2(30)   -- ex: 'bus', 'minibus', 'electric'
);

CREATE TABLE TICKET (
  ticket_id    NUMBER(10)     PRIMARY KEY,
  price        NUMBER(10,2)   NOT NULL,         -- no relatório está numeric(10,0)
  SystemUserCode      NUMBER(10)     NOT NULL,
  trip_id      NUMBER(10),                      -- viagem (se decidirem usar)
  itinerary_id NUMBER(10),                      -- id de itinerário (liga ao módulo de rotas)
  status       VARCHAR2(20),                    -- ex: 'valid', 'canceled'

  CONSTRAINT fk_ticket_user
    FOREIGN KEY (SystemUserCode) REFERENCES SYSTEMUSERS(SystemUserCode)
);

CREATE TABLE SCHEDULE (
  schedule_id      NUMBER(10)    PRIMARY KEY,
  itinerary_id     NUMBER(10),         -- pode corresponder ao itinerário em Neo4j
  day_type         VARCHAR2(20)  NOT NULL,  -- weekday, weekend, holiday...
  destination_name VARCHAR2(100),
  first_departure  TIMESTAMP
);

CREATE TABLE DRIVER_VEHICLE (
  driver_id    NUMBER(10)  NOT NULL,
  vehicle_id   NUMBER(10)  NOT NULL,
  driving_date DATE        NOT NULL,

  CONSTRAINT pk_driver_vehicle
    PRIMARY KEY (driver_id, vehicle_id, driving_date),

  CONSTRAINT fk_dv_driver
    FOREIGN KEY (driver_id) REFERENCES DRIVER(driver_id),

  CONSTRAINT fk_dv_vehicle
    FOREIGN KEY (vehicle_id) REFERENCES VEHICLE(vehicle_id)
);


--------- INSERTS PARA SYSTEM USERS -------------
INSERT INTO SYSTEMUSERS 
VALUES (1, 'Charlotte', 'Miller', 'charlotte.miller@example.com', TO_DATE('1998-01-15', 'YYYY-MM-DD'), 1003, 'teste1');
INSERT INTO SYSTEMUSERS 
VALUES (2, 'Rita', 'Maia', 'ritamaia@gmail.com', TO_DATE('2003-10-04', 'YYYY-MM-DD'), 1004, '1234');
INSERT INTO SYSTEMUSERS 
VALUES (3, 'Carlos', 'Nunes', 'carlos.nunes@example.com', TO_DATE('1997-02-11', 'YYYY-MM-DD'), 1005, 'pass7');
INSERT INTO SYSTEMUSERS 
VALUES (4, 'Beatriz', 'Ferreira', 'beatriz.ferreira@example.com', TO_DATE('2002-07-25', 'YYYY-MM-DD'), 1006, 'pass8');
INSERT INTO SYSTEMUSERS 
VALUES (5, 'Tiago', 'Rocha', 'tiago.rocha@example.com', TO_DATE('1996-12-05', 'YYYY-MM-DD'), 1007, 'pass9');
INSERT INTO SYSTEMUSERS 
VALUES (6, 'Luisa', 'Almeida', 'luisa.almeida@example.com', TO_DATE('1999-04-09', 'YYYY-MM-DD'), 1008, 'pass10');
INSERT INTO SYSTEMUSERS 
VALUES (7, 'Pedro', 'Marques', 'pedro.marques@example.com', TO_DATE('2001-01-19', 'YYYY-MM-DD'), 1009, 'pass11');
INSERT INTO SYSTEMUSERS 
VALUES (8, 'Ines', 'Oliveira', 'ines.oliveira@example.com', TO_DATE('2000-08-29', 'YYYY-MM-DD'), 1010, 'pass12');


--------- INSERTS PARA DRIVERS -------------
INSERT INTO DRIVER (driver_id, name, license_number, experience_years)
VALUES (1, 'Ethan Brooks', 'LMN456', 5);
INSERT INTO DRIVER (driver_id, name, license_number, experience_years)
VALUES (2, 'Paula Jenkins', 'JKL321', 12);
INSERT INTO DRIVER (driver_id, name, license_number, experience_years)
VALUES (3, 'Gavin Walker', 'PQR987', 1);
INSERT INTO DRIVER (driver_id, name, license_number, experience_years)
VALUES (4, 'Liam Hayes', 'STU654', 8);
INSERT INTO DRIVER (driver_id, name, license_number, experience_years)
VALUES (5, 'Maria Lopes', 'VWX321', 3);



--------- INSERTS PARA VEHICLES -------------
INSERT INTO VEHICLE (vehicle_id, plate, capacity, status, line_id, type)
VALUES (1, 'CC-33-CC', 60, 'active', 1, 'bus');
INSERT INTO VEHICLE (vehicle_id, plate, capacity, status, line_id, type)
VALUES (2, 'DD-44-DD', 40, 'active', 3, 'bus');
INSERT INTO VEHICLE (vehicle_id, plate, capacity, status, line_id, type)
VALUES (3, 'EE-55-EE', 20, 'out_of_service', 4, 'minibus');
INSERT INTO VEHICLE (vehicle_id, plate, capacity, status, line_id, type)
VALUES (4, 'FF-66-FF', 30, 'active', 5, 'bus');
INSERT INTO VEHICLE (vehicle_id, plate, capacity, status, line_id, type)
VALUES (5, 'GG-77-GG', 50, 'maintenance', 6, 'bus');


--------- INSERTS PARA TICKET -------------
INSERT INTO TICKET (ticket_id, price, SystemUserCode, trip_id, itinerary_id, status)
VALUES (3, 1.80, 3, 12, 100, 'valid');
INSERT INTO TICKET (ticket_id, price, SystemUserCode, trip_id, itinerary_id, status)
VALUES (4, 2.20, 4, 13, 101, 'valid');
INSERT INTO TICKET (ticket_id, price, SystemUserCode, trip_id, itinerary_id, status)
VALUES (5, 1.50, 5, 14, 102, 'canceled');
INSERT INTO TICKET (ticket_id, price, SystemUserCode, trip_id, itinerary_id, status)
VALUES (6, 2.50, 6, 15, 100, 'valid');
INSERT INTO TICKET (ticket_id, price, SystemUserCode, trip_id, itinerary_id, status)
VALUES (7, 1.20, 1, 16, 101, 'valid');
INSERT INTO TICKET (ticket_id, price, SystemUserCode, trip_id, itinerary_id, status)
VALUES (8, 1.80, 2, 17, 102, 'refunded');
INSERT INTO TICKET (ticket_id, price, SystemUserCode, trip_id, itinerary_id, status)
VALUES (9, 1.30, 7, 18, 100, 'valid');
INSERT INTO TICKET (ticket_id, price, SystemUserCode, trip_id, itinerary_id, status)
VALUES (10, 2.00, 8, 19, 101, 'valid');
INSERT INTO TICKET (ticket_id, price, SystemUserCode, trip_id, itinerary_id, status)
VALUES (11, 1.75, 9, 20, 102, 'canceled');
INSERT INTO TICKET (ticket_id, price, SystemUserCode, trip_id, itinerary_id, status)
VALUES (12, 2.40, 10, 21, 103, 'valid');
INSERT INTO TICKET (ticket_id, price, SystemUserCode, trip_id, itinerary_id, status)
VALUES (13, 1.10, 11, 22, 104, 'refunded');
INSERT INTO TICKET (ticket_id, price, SystemUserCode, trip_id, itinerary_id, status)
VALUES (14, 1.90, 12, 23, 105, 'valid');
INSERT INTO TICKET (ticket_id, price, SystemUserCode, trip_id, itinerary_id, status)
VALUES (15, 1.50, 1, 24, 100, 'valid');
INSERT INTO TICKET (ticket_id, price, SystemUserCode, trip_id, itinerary_id, status)
VALUES (16, 2.30, 2, 25, 101, 'canceled');
INSERT INTO TICKET (ticket_id, price, SystemUserCode, trip_id, itinerary_id, status)
VALUES (17, 1.60, 3, 26, 102, 'valid');
INSERT INTO TICKET (ticket_id, price, SystemUserCode, trip_id, itinerary_id, status)
VALUES (18, 2.10, 4, 27, 103, 'valid');
INSERT INTO TICKET (ticket_id, price, SystemUserCode, trip_id, itinerary_id, status)
VALUES (19, 1.40, 5, 28, 104, 'refunded');
INSERT INTO TICKET (ticket_id, price, SystemUserCode, trip_id, itinerary_id, status)
VALUES (20, 2.00, 6, 29, 105, 'valid');



--------- INSERTS PARA SCHEDULE -------------
INSERT INTO SCHEDULE (schedule_id, itinerary_id, day_type, destination_name, first_departure)
VALUES (
  3,
  100,
  'weekday',
  'University Campus',
  TO_TIMESTAMP('2025-05-01 08:00', 'YYYY-MM-DD HH24:MI')
);
INSERT INTO SCHEDULE (schedule_id, itinerary_id, day_type, destination_name, first_departure)
VALUES (
  4,
  101,
  'weekend',
  'City Center',
  TO_TIMESTAMP('2025-05-02 09:00', 'YYYY-MM-DD HH24:MI')
);

INSERT INTO SCHEDULE (schedule_id, itinerary_id, day_type, destination_name, first_departure)
VALUES (
  5,
  102,
  'weekday',
  'Train Station',
  TO_TIMESTAMP('2025-05-03 07:30', 'YYYY-MM-DD HH24:MI')
);

--------- INSERTS PARA DRIVER_VEHICLE -------------
INSERT INTO DRIVER_VEHICLE 
VALUES (1, 2, TO_DATE('2025-05-03', 'YYYY-MM-DD'));
INSERT INTO DRIVER_VEHICLE 
VALUES (2, 3, TO_DATE('2025-05-01', 'YYYY-MM-DD'));
INSERT INTO DRIVER_VEHICLE 
VALUES (3, 4, TO_DATE('2025-05-02', 'YYYY-MM-DD'));
INSERT INTO DRIVER_VEHICLE 
VALUES (3, 5, TO_DATE('2025-05-03', 'YYYY-MM-DD'));


