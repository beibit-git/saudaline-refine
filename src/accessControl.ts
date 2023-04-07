import { newModel, StringAdapter } from "casbin";

export const model = newModel(`
[request_definition]
r = sub, obj, act

[policy_definition]
p = sub, obj, act, eft

[role_definition]
g = _, _

[policy_effect]
e = some(where (p.eft == allow)) && !some(where (p.eft == deny))

[matchers]
m = g(r.sub, p.sub) && keyMatch(r.obj, p.obj) && regexMatch(r.act, p.act)
`);

export const adapter = new StringAdapter(`
p, ROLE_ADMIN, categories, (list)|(create)
p, ROLE_ADMIN, categories/*, (edit)|(show)|(delete)
p, ROLE_ADMIN, categories/*, field

p, ROLE_ADMIN, region, (list)|(create)
p, ROLE_ADMIN, region/*, (edit)|(show)|(delete)
p, ROLE_ADMIN, region/*, field

p, ROLE_ADMIN, brands, (list)|(create)
p, ROLE_ADMIN, brands/*, (edit)|(show)|(delete)
p, ROLE_ADMIN, brands/*, field

p, ROLE_ADMIN, city, (list)|(create)
p, ROLE_ADMIN, city/*, (edit)|(show)|(delete)
p, ROLE_ADMIN, city/*, field

p, ROLE_ADMIN, provider-category, (list)|(create)
p, ROLE_ADMIN, provider-category/*, (edit)|(show)|(delete)
p, ROLE_ADMIN, provider-category/*, field

p, ROLE_PROVIDER, categories, (list)|(create)
p, ROLE_PROVIDER, categories/*, (edit)|(show)|(delete)
p, ROLE_PROVIDER, categories/*, field

p, ROLE_PROVIDER, subcategory, (list)|(create)
p, ROLE_PROVIDER, subcategory/*, (edit)|(show)|(delete)
p, ROLE_PROVIDER, subcategory/*, field

p, ROLE_PROVIDER, product, (list)|(create)
p, ROLE_PROVIDER, product/*, (edit)|(show)|(delete)
p, ROLE_PROVIDER, product/*, field

p, ROLE_PROVIDER, promotion, (list)|(create)
p, ROLE_PROVIDER, promotion/*, (edit)|(show)|(delete)
p, ROLE_PROVIDER, promotion/*, field

p, ROLE_PROVIDER, promotion-product, (list)|(create)
p, ROLE_PROVIDER, promotion-product/*, (edit)|(show)|(delete)
p, ROLE_PROVIDER, promotion-product/*, field

p, ROLE_PROVIDER, orders, (list)
p, ROLE_PROVIDER, orders/*, (edit)|(show)
p, ROLE_PROVIDER, orders/*, field

p, ROLE_CUSTOMER, categories, list
p, ROLE_CUSTOMER, categories/actions, field, deny

`);
