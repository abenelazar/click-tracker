CREATE TABLE IF NOT EXISTS element_tracking (
    ip varchar(255),
    host varchar(255), 
    element varchar(255) NOT NULL,
    user_agent varchar(255),
    date date DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS link_tracking (
    ip varchar(255),
    host varchar(255), 
    link varchar(255) NOT NULL,
    user_agent varchar(255),
    date date DEFAULT NOW()
);

SELECT NOW() AS time;