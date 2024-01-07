1. ***BullMQ Basics***: 
  BullMQ is a Node.js library that implements a fast and robust queue system built on top of Redis that helps in resolving many modern age micro-services architectures.
  
    The library is designed so that it will fulfill the following goals:
    - Exactly once queue semantics, i.e., attempts to deliver every message exactly one time, but it will deliver at least once in the worst case scenario.
    - Easy to scale horizontally. Add more workers for processing jobs in parallel.
    - Consistent.
    - High performant. Try to get the highest possible throughput from Redis by   combining efficient .lua scripts and pipelining.

    Features:
      - Minimal CPU usage due to a polling-free design
      - Distributed job execution based on Redis
      - LIFO and FIFO jobs
      - Priorities
      - Delayed jobs
      - Scheduled and repeatable jobs according to cron specifications
      - Retries of failed jobs
      - Concurrebuncy setting per worker
      - Threaded (sandboxed) processing functions
      - Automatic recovery from process crashes
      - Parent-Child dependencies

    NOTES: 
      - You can have as many worker processes as you want, BullMQ will distribute the jobs across your workers in a round robin fashion.
      - You can listen to completed (or failed) jobs by attaching listeners to the workers
        ```javascript
        worker.on('completed', job => {
          console.log(`${job.id} has completed!`);
        });

        worker.on('failed', (job, err) => {
          console.log(`${job.id} has failed with ${err.message}`);
        });
        ```
2. 4 classes of BullMQ:
    1. Queue
        - adding jobs to the queue
        - pausing
        - cleaning
        - getting data from the queue
    2. Worker
        Workers are instances capable of processing jobs. You can have many workers, either running in the same Node.js process, or in separate processes as well as in different machines. They will all consume jobs from the queue and mark the jobs as completed or failed.
    3. QueueEvents
    4. FlowProducer.
    