---
title: "LeetCode it's MyGo!!!!! 2023年12月"
excerpt: "88.合并两个有序数组 27.移除元素 26.删除有序数组中的重复项 80.删除有序数组中的重复项 II"
author: public/content/authors/ridd-ma.md
categories:
  - category: public/content/categories/coding.md
columns:
  - column: public/content/columns/leetcode-its-mygo.md
tags:
  - Go
  - Golang
  - LeetCode
  - 力扣
  - 算法
  - 笔记
date: 2023-12-06T11:28:00+08:00
updateDate: 2023-12-06T11:28:00+08:00
---

# [88. 合并两个有序数组](https://leetcode.cn/problems/merge-sorted-array/)

## 问题

![image](/content/posts/assets/image-20231204155323-kyfed3c.png)

> 给你两个按 非递减顺序 排列的整数数组 nums1 和 nums2，另有两个整数 m 和 n ，分别表示 nums1 和 nums2 中的元素数目。
> 请你 合并 nums2 到 nums1 中，使合并后的数组同样按 非递减顺序 排列。
> 注意：最终，合并后数组不应由函数返回，而是存储在数组 nums1 中。为了应对这种情况，nums1 的初始长度为 m + n，其中前 m 个元素表示应合并的元素，后 n 个元素为 0 ，应忽略。nums2 的长度为 n 。
> 示例 1：
> 输入：nums1 \= [1,2,3,0,0,0], m \= 3, nums2 \= [2,5,6], n \= 3
> 输出：[1,2,2,3,5,6]
> 解释：需要合并 [1,2,3] 和 [2,5,6] 。
> 合并结果是 [1,2,2,3,5,6] ，其中斜体加粗标注的为 nums1 中的元素。
> 示例 2：
> 输入：nums1 \= [1], m \= 1, nums2 \= [], n \= 0
> 输出：[1]
> 解释：需要合并 [1] 和 [] 。
> 合并结果是 [1] 。
> 示例 3：
> 输入：nums1 \= [0], m \= 0, nums2 \= [1], n \= 1
> 输出：[1]
> 解释：需要合并的数组是 [] 和 [1] 。
> 合并结果是 [1] 。
> 注意，因为 m \= 0 ，所以 nums1 中没有元素。nums1 中仅存的 0 仅仅是为了确保合并结果可以顺利存放到 nums1 中。
> 提示：
> nums1.length \=\= m + n
> nums2.length \=\= n
> 0 \<\= m, n \<\= 200
> 1 \<\= m + n \<\= 200
> -109 \<\= nums1[i], nums2[j] \<\= 109
> 进阶：你可以设计实现一个时间复杂度为 O(m + n) 的算法解决此问题吗？

## 题解

思路是倒序双指针法。由于`nums1`的后半部分为空，倒序双指针仅需要严格的`m+n`次即可完成排序，可以原地完成合并。而正序的双指针需要额外`O(m)`空间存储被覆盖的元素。第二个循环只需要考虑`nums2`，写法更简洁。

```go
// 输入：nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
// 输出：[1,2,2,3,5,6]
// 解释：需要合并 [1,2,3] 和 [2,5,6] 。
// 合并结果是 [1,2,2,3,5,6] ，其中斜体加粗标注的为 nums1 中的元素。

func merge(nums1 []int, m int, nums2 []int, n int) {
	i, j, k := m-1, n-1, m+n-1

	for i >= 0 && j >= 0 {
		if nums1[i] > nums2[j] {
			nums1[k] = nums1[i]
			i--
		} else {
			nums1[k] = nums2[j]
			j--
		}
		k--
	}

    // 当第一个循环结束时，可能存在两种情况：

    // 如果 nums1 中的元素已经全部处理完（i < 0），那么 nums2 中剩余的元素（如果有的话）就不需要再进行比较，直接将它们复制到 nums1 的前面即可。
    // 如果 nums2 中的元素已经全部处理完（j < 0），那么 nums1 中原有的元素已经在正确的位置，无需再进行处理。

    // 因此，第二个循环只需要考虑 nums2 中可能剩余的元素。

	for j >= 0 {
		nums1[k] = nums2[j]
		j--
		k--
	}
}
```


# [27. 移除元素](https://leetcode.cn/problems/remove-element/)

## 问题

![image](/content/posts/assets/image-20231204161510-1zrx41u.png)


> 给你一个数组 nums 和一个值 val，你需要 原地 移除所有数值等于 val 的元素，并返回移除后数组的新长度。
> 不要使用额外的数组空间，你必须仅使用 O(1) 额外空间并 原地 修改输入数组。
> 元素的顺序可以改变。你不需要考虑数组中超出新长度后面的元素。
> 说明:
> 为什么返回数值是整数，但输出的答案是数组呢?
> 请注意，输入数组是以「引用」方式传递的，这意味着在函数里修改输入数组对于调用者是可见的。
> 你可以想象内部操作如下:
> // nums 是以“引用”方式传递的。也就是说，不对实参作任何拷贝
> int len \= removeElement(nums, val);
> // 在函数里修改输入数组对于调用者是可见的。
> // 根据你的函数返回的长度, 它会打印出数组中 该长度范围内 的所有元素。
> for (int i \= 0; i \< len; i++) {
>     print(nums[i]);
> }
> 示例 1：
> 输入：nums \= [3,2,2,3], val \= 3
> 输出：2, nums \= [2,2]
> 解释：函数应该返回新的长度 2, 并且 nums 中的前两个元素均为 2。你不需要考虑数组中超出新长度后面的元素。例如，函数返回的新长度为 2 ，而 nums \= [2,2,3,3] 或 nums \= [2,2,0,0]，也会被视作正确答案。
> 示例 2：
> 输入：nums \= [0,1,2,2,3,0,4,2], val \= 2
> 输出：5, nums \= [0,1,3,0,4]
> 解释：函数应该返回新的长度 5, 并且 nums 中的前五个元素为 0, 1, 3, 0, 4。注意这五个元素可为任意顺序。你不需要考虑数组中超出新长度后面的元素。
> 提示：
> 0 \<\= nums.length \<\= 100
> 0 \<\= nums[i] \<\= 50
> 0 \<\= val \<\= 100

## 题解

```go
// naive方法，见一个删一个，效率低
func removeElement(nums []int, val int) int {
	l := len(nums)
	for i := 0; i < l; {
		if nums[i] == val {
			for j := i; j < l-1; j++ {
				nums[j] = nums[j+1]
			}
			l--
		} else {
			i++
		}
	}
	return l
}


// 双指针
func removeElement(nums []int, val int) int {
    // left 指针用于记录不等于给定值的元素位置
    left := 0

    // 遍历数组中的每个元素
    for _, v := range nums {
        // 如果当前元素不等于给定值 val
        if v != val {
            // 将当前元素放入 left 指针的位置，同时 left 指针右移
            nums[left] = v
            left++
        }
    }

    // 返回不等于给定值的元素个数，即 left 指针的位置
    return left
}
```

---

最优方法，左右双指针。使用这种方法的前提是不要求数组顺序。

1. **初始化左右指针：**`left` 指向数组的开头，`right` 指向数组的末尾。
2. **循环条件：**  当 `left` 指针小于等于 `right` 指针时，进行循环。
3. **判断左指针指向的元素是否等于val：**

 * 如果 `nums[left]` 等于 `val`，说明需要移除该元素。
 * 将 `nums[left]` 替换为 `nums[right]`，相当于用末尾的元素填充要移除的元素。
 * 然后缩小数组的有效范围，即将 `right` 指针左移一位。
4. **左指针右移：**  如果 `nums[left]` 不等于 `val`，说明该元素是不需要移除的，左指针右移一位。
5. **循环结束：**  当左右指针相遇时，循环结束。
6. **返回结果：**  返回左指针的位置，即数组的有效长度，因为左指针之前的元素都是不等于val的。

```go
func removeElement(nums []int, val int) int {
    left, right := 0, len(nums)-1 // 初始化左右两个指针，left指向数组开头，right指向数组末尾

    for left <= right {
        if nums[left] == val { // 如果左指针指向的元素等于val
            nums[left] = nums[right] // 将左指针指向的元素替换为右指针指向的元素
            right-- // 缩小数组的有效范围，相当于删除了一个值等于val的元素
        } else {
            left++ // 如果左指针指向的元素不等于val，左指针右移
        }
    }

    return left // 返回最终数组的有效长度，即不包含值等于val的部分
}
```


# [26. 删除有序数组中的重复项](https://leetcode.cn/problems/remove-duplicates-from-sorted-array/)

## 问题

![image](/content/posts/assets/image-20231204170234-n7jbra9.png)

> 给你一个 非严格递增排列 的数组 nums ，请你 原地 删除重复出现的元素，使每个元素 只出现一次 ，返回删除后数组的新长度。元素的 相对顺序 应该保持 一致 。然后返回 nums 中唯一元素的个数。
> 考虑 nums 的唯一元素的数量为 k ，你需要做以下事情确保你的题解可以被通过：
> 更改数组 nums ，使 nums 的前 k 个元素包含唯一元素，并按照它们最初在 nums 中出现的顺序排列。nums 的其余元素与 nums 的大小不重要。
> 返回 k 。
> 判题标准:
> 系统会用下面的代码来测试你的题解:
> int[] nums \= [...]; // 输入数组
> int[] expectedNums \= [...]; // 长度正确的期望答案
> int k \= removeDuplicates(nums); // 调用
> assert k \=\= expectedNums.length;
> for (int i \= 0; i \< k; i++) {
>     assert nums[i] \=\= expectedNums[i];
> }
> 如果所有断言都通过，那么您的题解将被 通过。
> 示例 1：
> 输入：nums \= [1,1,2]
> 输出：2, nums \= [1,2,\_]
> 解释：函数应该返回新的长度 2 ，并且原数组 nums 的前两个元素被修改为 1, 2 。不需要考虑数组中超出新长度后面的元素。
> 示例 2：
> 输入：nums \= [0,0,1,1,1,2,2,3,3,4]
> 输出：5, nums \= [0,1,2,3,4]
> 解释：函数应该返回新的长度 5 ， 并且原数组 nums 的前五个元素被修改为 0, 1, 2, 3, 4 。不需要考虑数组中超出新长度后面的元素。
> 提示：
> 1 \<\= nums.length \<\= 3 \* 104
> -104 \<\= nums[i] \<\= 104
> nums 已按 非严格递增 排列

## 题解

```go
// removeDuplicates 函数接受一个非严格递增排列的整数数组 nums，并原地删除重复出现的元素。
// 该函数返回删除后数组的新长度，并将原数组的前 k 个元素包含唯一元素，
// 并按照它们最初在数组中出现的顺序排列。
func removeDuplicates(nums []int) int {
    // unique 用于记录不重复元素的位置
    unique := 0

    // 从数组的第二个元素开始遍历
    for idx := 1; idx < len(nums); idx++ {
        // 如果当前元素与前一个元素不相等
        if nums[idx] != nums[unique] {
            // 将当前元素放到不重复元素的位置，并更新 unique 指针
            nums[unique+1] = nums[idx]
            unique++
        }
    }

    // 返回不重复元素的个数，即不重复元素的位置加 1
    return unique + 1
}

```


# [80. 删除有序数组中的重复项 II](https://leetcode.cn/problems/remove-duplicates-from-sorted-array-ii/)

## 问题

![image](/content/posts/assets/image-20231204172346-p2xd61z.png)

> 给你一个有序数组 nums ，请你 原地 删除重复出现的元素，使得出现次数超过两次的元素只出现两次 ，返回删除后数组的新长度。
> 不要使用额外的数组空间，你必须在 原地 修改输入数组 并在使用 O(1) 额外空间的条件下完成。
> 说明：
> 为什么返回数值是整数，但输出的答案是数组呢？
> 请注意，输入数组是以「引用」方式传递的，这意味着在函数里修改输入数组对于调用者是可见的。
> 你可以想象内部操作如下:
> // nums 是以“引用”方式传递的。也就是说，不对实参做任何拷贝
> int len \= removeDuplicates(nums);
> // 在函数里修改输入数组对于调用者是可见的。
> // 根据你的函数返回的长度, 它会打印出数组中 该长度范围内 的所有元素。
> for (int i \= 0; i \< len; i++) {
>     print(nums[i]);
> }
> 示例 1：
> 输入：nums \= [1,1,1,2,2,3]
> 输出：5, nums \= [1,1,2,2,3]
> 解释：函数应返回新长度 length \= 5, 并且原数组的前五个元素被修改为 1, 1, 2, 2, 3。 不需要考虑数组中超出新长度后面的元素。
> 示例 2：
> 输入：nums \= [0,0,1,1,1,1,2,3,3]
> 输出：7, nums \= [0,0,1,1,2,3,3]
> 解释：函数应返回新长度 length \= 7, 并且原数组的前五个元素被修改为 0, 0, 1, 1, 2, 3, 3。不需要考虑数组中超出新长度后面的元素。
> 提示：
> 1 \<\= nums.length \<\= 3 \* 104
> -104 \<\= nums[i] \<\= 104
> nums 已按升序排列

## 题解

这题数组升序排列，所以能做到只用`O(1)`完成。

思路是快慢指针：

```go
// removeDuplicates 函数用于原地删除有序数组中出现次数超过两次的重复元素，
// 返回删除后数组的新长度。函数要求在原地修改输入数组，并使用 O(1) 额外空间。
func removeDuplicates(nums []int) int {
    // 获取数组的长度
    l := len(nums)

    // 如果数组长度小于等于2，无需删除重复元素，直接返回数组长度
    if l <= 2 {
        return l
    }

    // 初始化慢指针，指向新数组的下标2
    slow := 2

    // 初始化快指针，用于遍历数组
    for fast := 2; fast < l; {
        // 检查当前元素是否与慢指针前两个位置的元素相同
        if nums[slow-2] != nums[fast] {
            // 如果不相同，将当前元素复制到慢指针位置，并移动慢指针
            nums[slow] = nums[fast]
            slow++
        }

        // 移动快指针
        fast++
    }

    // 返回新数组的长度
    return slow
}
```

或者使用计数法：

```go
func removeDuplicates(nums []int) int {
    // 如果数组长度小于等于2，无需处理，直接返回数组长度
    if len(nums) <= 2 {
        return len(nums)
    }

    count := 1  // 记录当前数字出现的次数
    index := 1  // 记录新数组的索引位置

    // 从第二个元素开始遍历原数组
    for i := 1; i < len(nums); i++ {
        // 如果当前数字和前一个数字相同，增加计数器
        if nums[i] == nums[i-1] {
            count++
        } else {
            // 如果当前数字和前一个数字不同，重置计数器
            count = 1
        }

        // 根据计数器的值判断是否将当前数字加入新数组
        // 只有当计数器不大于2时才加入
        if count <= 2 {
            nums[index] = nums[i]
            index++
        }
    }

    // 返回新数组的长度
    return index
}
```