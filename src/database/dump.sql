INSERT INTO products (name, description, price, partner_id, img_url, category_id)
VALUES 
('Cupom R$10,00 iFood', 'Cupom de R$10,00 para pedidos no iFood', '100', 3, 'https://cdn.gatry.com/gatry-static/promocao/imagem/134ae1730647a9b5ab05f7b9a095eb14.png', 1)
('Cupom R$20,00 iFood', 'Cupom de R$20,00 para pedidos no iFood', '200', 3, 'https://cdn.gatry.com/gatry-static/promocao/imagem/134ae1730647a9b5ab05f7b9a095eb14.png', 1)
('Cupom R$30,00 iFood', 'Cupom de R$30,00 para pedidos no iFood', '300', 3, 'https://cdn.gatry.com/gatry-static/promocao/imagem/134ae1730647a9b5ab05f7b9a095eb14.png', 1)
('Air Pods', 'Fones de ouvido Air Pods', '250', 5, 'https://www.fastshop.com.br/wcsstore/FastShopCAS/imagens/_AE_Apple/AEMV7N2BEABCO/V2/AEMV7N2BEABCO_PRD_447_2.jpg', 2)


INSERT INTO partners (nome, cep, cnpj, logo_url)
values 
('Natura', 11111111, 11111111111, 'data:image/png;base64,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')
,('Americanas', 11111111, 11111111111, 'https://www.anacouto.com.br/wp-content/uploads/2021/07/GALERIA-SITE-AMERICANAS.png')
,('Centauro', 11111111, 11111111111, 'data:image/png;base64,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')




