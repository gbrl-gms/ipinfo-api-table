const btnPesquisar = document.querySelector('#btnPesquisar');
const inputIp = document.querySelector('#inputIp');
const tabelaIps = document.querySelector('#tabelaIps tbody');

btnPesquisar.addEventListener('click', buscarIp);

inputIp.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        buscarIp();
    }
});

async function buscarIp() {
  const ip = inputIp.value.trim();
  if (!ip) return;

  const resposta = await fetch(`https://ipinfo.io/${ip}/json?token=be3e8f6a5a98e8`);
  const dados = await resposta.json();

  const linha = document.createElement('tr');
  linha.innerHTML = `
    <td>${dados.ip || '-'}</td>
    <td>${dados.org || '-'}</td>
    <td>${dados.country || '-'}</td>
    <td>${dados.city || '-'}</td>
    <td><i class="fa fa-times" style="cursor:pointer;"></i></td>
  `;

  linha.querySelector('i').addEventListener('click', () => linha.remove());

  tabelaIps.appendChild(linha);

  inputIp.value = '';
  inputIp.focus();
}
