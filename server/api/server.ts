const address = "UQChppXUZZs2t_E5j_iZE2PDn1KfVcFFYPQZa158niaznxnW"
const url = `https://ton-mainnet.core.chainstack.com/f2a2411bce1e54a2658f2710cd7969c3/api/v2/getAddressBalance?address=${address}`
const options = {method: 'GET', body: null};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} 
  catch (error) {
  console.error(error);
}