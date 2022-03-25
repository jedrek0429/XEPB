import Client from "./classes/Client";

const client = new Client();

try {
    client.start();
} catch (error) {
    console.error(error);
}