require('./comments');

describe('comments', () => {
  it('exposes module as global', () => {
    expect(window.comments).toBeDefined();
  });
  
});

describe('getContentPath', () => {
  // Mock dataset for elements
  const createElement = (contentpath, disabled = false) => {
    const element = document.createElement('div');
    if (contentpath) {
      element.dataset.contentpath = contentpath;
    }
    if (disabled) {
      element.setAttribute('data-contentpath-disabled', '');
    }
    return element;
  };

  it('should return empty string when fieldNode is null', () => {
    expect(getContentPath(null)).toBe(''); // Linha 1 da Tabela 1
  });

  it('should return empty string when fieldNode has [data-contentpath-disabled]', () => {
    const fieldNode = createElement(null, true);
    document.body.appendChild(fieldNode);
    expect(getContentPath(fieldNode)).toBe(''); // Linha 2 da Tabela 1
    document.body.removeChild(fieldNode);
  });

  it('should return empty string when no [data-contentpath] elements exist', () => {
    const fieldNode = document.createElement('div');
    document.body.appendChild(fieldNode);
    expect(getContentPath(fieldNode)).toBe(''); // Linha 3 da Tabela 1
    document.body.removeChild(fieldNode);
  });

  it('should return contentpath for valid hierarchy of elements', () => {
    const parent = createElement('parent');
    const child = createElement('child');
    parent.appendChild(child);
    document.body.appendChild(parent);

    expect(getContentPath(child)).toBe('parent.child'); // Linha 4 da Tabela 1

    document.body.removeChild(parent);
  });
});

describe('getContentPath - while loop', () => {
  // Mock dataset for elements
  const createElement = (contentpath) => {
    const element = document.createElement('div');
    if (contentpath) {
      element.dataset.contentpath = contentpath;
    }
    return element;
  };

  it('should return empty string when starting element is null', () => {
    expect(getContentPath(null)).toBe(''); // Linha 2 da Tabela 2
  });

  it('should iterate over parent elements and return full contentpath', () => {
    const parent = createElement('parent');
    const child = createElement('child');
    parent.appendChild(child);
    document.body.appendChild(parent);

    expect(getContentPath(child)).toBe('parent.child'); // Linha 1 da Tabela 2

    document.body.removeChild(parent);
  });
});

