const prompts = {
javascript: `let device;
navigator.usb.requestDevice({ filters: [{ vendorId: 0x2341 }] })
.then(selectedDevice => {
	device = selectedDevice;
	return device.open();
})
.then(() => device.selectConfiguration(1))
.then(() => device.claimInterface(2))
.then(() => device.controlTransferOut({
	requestType: 'class',
	recipient: 'interface',
	request: 0x22,
	value: 0x01,
	index: 0x02}))
.then(() => device.transferIn(5, 64))
.then(result => {
	let decoder = new TextDecoder();
	console.log('Received: ' + decoder.decode(result.data));
})
.catch(error => { console.log(error); });`,

javascript2: ['let ', 'device; ', 'navigator.usb.requestDevice({ ', '[{ ', 'vendorId: ', '0x2341 ', '}] ', '})', '.then(selectedDevice ', '=> ', '{device ', '= ', 'selectedDevice;', 'return ', 'device.open();', '})', '.then(() ', '=> ', 'device.selectConfiguration(1))', '.then(() ', '=> ', 'device.claimInterface(2))', '.then(() ', '=> ', 'device.controlTransferOut({', 'requestType: ', "'class',", 'recipient: ', "'interface',", 'request: ', '0x22,', 'value: ', '0x01']
}



export default prompts;