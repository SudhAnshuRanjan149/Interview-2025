# s4 = [1,1,2,3,4,5]
# s5 = set(s4)
# print(s5)
# s6 = list(s5)
# print(s6)

# l1 = [1,2,3]
# l1.insert(1,5)
# print(l1)

# l2 = [7,8,9]
# l1.append(l2)
# print(l1)
# l1.extend(l2)
# print(l1)

# d = {
#     "model": "gpt",
#     1: "gpt",
#     (1,3,5): "gpt",
#     [1,2,3]: "abc"
# }
# print(d)

# dict = {

#     "key1" : {
#         "key2" : "opanai",
#     }
# }

import copy

# list1 = [[1,2],[8,9]]

list1 = [1,2,3,4,5]

list2 = list1.copy()
list2[0] = 12

print(list1)
print(list2)

# print(list1)
# list3 = copy.deepcopy(list1)
# list3.append(7)

# print(list3)