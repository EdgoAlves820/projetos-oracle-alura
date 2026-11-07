const entrada = document.querySelector('#entrada');
const resultado = document.querySelector('#resultado');
const vazio = document.querySelector('#vazio');
const copiar = document.querySelector('#copiar');
const aviso = document.querySelector('#aviso');
const chaves = { a: 'ai', e: 'enter', i: 'imes', o: 'ober', u: 'ufat' };
const inversas = Object.fromEntries(Object.entries(chaves).map(([letra, codigo]) => [codigo, letra]));

function processar(descriptografar = false) {
  const texto = entrada.value;
  if (!texto.trim()) {
    aviso.textContent = 'Digite um texto antes de continuar.';
    entrada.focus();
    return;
  }
  if (!/^[a-z\s]*$/.test(texto)) {
    aviso.textContent = 'Use apenas letras minúsculas sem acento e espaços.';
    entrada.focus();
    return;
  }
  resultado.value = descriptografar
    ? texto.replace(/enter|imes|ai|ober|ufat/g, codigo => inversas[codigo])
    : texto.replace(/[aeiou]/g, letra => chaves[letra]);
  vazio.hidden = true;
  resultado.hidden = false;
  copiar.hidden = false;
  aviso.textContent = '';
}

document.querySelector('#criptografar').addEventListener('click', () => processar());
document.querySelector('#descriptografar').addEventListener('click', () => processar(true));
copiar.addEventListener('click', async () => {
  try {
    if (!navigator.clipboard || !window.isSecureContext) throw new Error('Clipboard indisponível');
    await navigator.clipboard.writeText(resultado.value);
    aviso.textContent = 'Texto copiado!';
  } catch {
    resultado.focus();
    resultado.select();
    aviso.textContent = 'Não foi possível copiar automaticamente. Copie o texto selecionado com Ctrl+C.';
  }
});
document.querySelector('#colar').addEventListener('click', async () => {
  try {
    if (!navigator.clipboard || !window.isSecureContext) throw new Error('Clipboard indisponível');
    entrada.value = await navigator.clipboard.readText();
    aviso.textContent = 'Texto colado. Confira se contém apenas letras minúsculas sem acento.';
  } catch {
    entrada.focus();
    aviso.textContent = 'Não foi possível acessar a área de transferência. Cole no campo com Ctrl+V.';
  }
});
