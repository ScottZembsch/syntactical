const prompts = {
// javascript: `let device;
// navigator.usb.requestDevice({ filters: [{ vendorId: 0x2341 }] })
// .then(selectedDevice => {
// 	device = selectedDevice;
// 	return device.open();
// })
// .then(() => device.selectConfiguration(1))
// .then(() => device.claimInterface(2))
// .then(() => device.controlTransferOut({
// 	requestType: 'class',
// 	recipient: 'interface',
// 	request: 0x22,
// 	value: 0x01,
// 	index: 0x02}))
// .then(() => device.transferIn(5, 64))
// .then(result => {
// 	let decoder = new TextDecoder();
// 	console.log('Received: ' + decoder.decode(result.data));
// })
// .catch(error => { console.log(error); });`,

javascript: ['let ', 'device; ', 'navigator.usb.requestDevice({ ', '[{ ', 'vendorId: ', '0x2341 ', '}] ', '})', '.then(selectedDevice ', '=> ', '{device ', '= ', 'selectedDevice;', 'return ', 'device.open();', '})', '.then(() ', '=> ', 'device.selectConfiguration(1))', '.then(() ', '=> ', 'device.claimInterface(2))', '.then(() ', '=> ', 'device.controlTransferOut({', 'requestType: ', "'class',", 'recipient: ', "'interface',", 'request: ', '0x22,', 'value: ', '0x01', 'index: ', '0x02}))', '.then(result ', '=> ', '{', 'let ', 'decoder ', '= ', 'new ', 'TextDecoder();', "console.log('Recieved: ' ", "+ ", 'decoder.decode(result.data));', '})', '.catch(error ', '=> ', '{ ', 'console.log(error); ', '});'],

python: ['def ', 'get_user_input(prompt): ','user_input ','= ','input(prompt) ','return ', 'user_input.strip() ','def ', 'ask_question(question, ', 'answer): ', 'user_answer ', '= ', 'get_user_input(question ', '+ ', '" ', '")', 'if ', 'user_answer.lower() ', '== ', 'answer.lower(): ', 'print("Correct!")', 'return ','1', 'else: ', 'print(f"Wrong! ', 'The ', 'correct ', 'answer ', 'is ', '{answer}.")', 'return ', '0', 'def ', 'quiz():', 'score ', '= ', '0', 'for ','question, ', 'answer ', 'in ', 'random.sample(questions.items(), ', 'k=len(questions)): ', 'score ', '+= ', 'ask_question(question, ', 'answer)', 'print(f"You ', 'scored ', '{score}/{len(questions)}.")', 'if ', '__name__ ', '== ', '"__main__":', 'print("Welcome ', 'to ', 'the ', 'Quiz!")', 'quiz()']
}



export default prompts;