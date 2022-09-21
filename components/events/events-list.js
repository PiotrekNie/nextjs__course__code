import EventItem from "./event-item";

import classes from "./events-list.module.css";

function EventList(props) {
  const { items } = props;

  return (
    <ul className={classes.list}>
      {items.map((item) => (
        <EventItem
          title={item.title}
          image={item.image}
          date={item.date}
          location={item.location}
          id={item.id}
          key={item.id}
        />
      ))}
    </ul>
  );
}

export default EventList;
