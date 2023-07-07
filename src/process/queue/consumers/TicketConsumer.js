import { findQueueByName, findJobByName } from "../domain";
import { TicketQueue } from "../queues";

export default function TicketConsumer() {
  const queue = findQueueByName(TicketQueue.name);
  queue.bull.process((job) => {
    const { jobName, payload } = job.data;
    const { handle } = findJobByName(jobName);
    handle(payload);
  });
}