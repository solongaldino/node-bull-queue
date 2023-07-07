import { findQueueByName, findJobByName } from "../domain";
import { ChangeQueue } from "../queues";

export default function ChangeConsumer() {
  const queue = findQueueByName(ChangeQueue.name);
  queue.bull.process((job) => {
    const { jobName, payload } = job.data;
    const { handle } = findJobByName(jobName);
    handle(payload);
  });
}