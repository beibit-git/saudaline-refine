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

p, ROLE_CUSTOMER, categories, list
p, ROLE_CUSTOMER, categories/actions, field, deny

`);
