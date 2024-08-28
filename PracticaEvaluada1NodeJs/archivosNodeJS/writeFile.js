const { writeFile } = require('fs/promises');

async function writeToFile(fileName, data) {
    try {
    await writeFile(fileName, data);
    console.log(`Wrote data to ${fileName}`);
    } catch (error) {
    console.error(`Got an error trying to write the
    file: ${error.message}`);
    }
}

module.exports = { writeToFile }