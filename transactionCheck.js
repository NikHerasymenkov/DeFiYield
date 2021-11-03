const Web3 = require('web3');
const fs = require('fs')


const url = 'https://mainnet.infura.io/v3/02f5e31abbe24396b01c445bc2a71a32';
const address = '0xa145ac099e3d2e9781c9c848249e2e6b256b030d';
const web3 = new Web3(new Web3.providers.HttpProvider(url))
// web3.eth.getBalance(address,(err,bal)=>{
//     console.log(  web3.utils.fromWei(bal))})
const check = async () => {
    let block = await web3.eth.getBlock('latest')
    let someNumber = block.number;
    console.log("Search Block..." + " " + someNumber)
    if (block != null && block.transactions != null) {
        for (let txHash of block.transactions) {
            let tx = await web3.eth.getTransaction(txHash)
            console.log(tx)
            if (tx.to.toLowerCase()) {
                // console.log("Transaction" + someNumber)
                // console.log({address:tx.from,value:web3.utils.fromWei(tx.value,'ether'),timestamp:new Date()})
                //
                let data = {}
                data.table = []
                for (let i = 0; i <= 30; i++) {
                    let obj = {address: tx.from, value: web3.utils.fromWei(tx.value, 'ether'), timestamp: new Date()}
                    data.table.push(obj)
                }
                fs.writeFileSync('db.json', JSON.stringify(data, null, 4))
            }
        }
    }
}
setInterval(() => {
    check()
}, 60000)




