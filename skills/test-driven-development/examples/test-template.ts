// 测试模板：单元测试基础结构
// 适用于 Vitest/Jest 框架

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

// Mock 数据工厂
function createMockUser(overrides = {}) {
  return {
    id: 'user_' + Math.random().toString(36).substr(2, 9),
    email: 'test@example.com',
    name: 'Test User',
    role: 'user',
    ...overrides
  }
}

// 测试套件模板
describe('[模块名称]', () => {
  // 每个测试前重置状态
  beforeEach(() => {
    vi.clearAllMocks()
    // 重置数据库连接/Mock 等
  })

  afterEach(() => {
    // 清理资源
  })

  describe('[函数/方法名]', () => {
    it('应该 [预期行为] 当 [正常输入]', async () => {
      // Arrange - 准备测试数据
      const input = createMockUser()
      
      // Act - 执行被测试函数
      const result = await targetFunction(input)
      
      // Assert - 断言结果
      expect(result).toBeDefined()
      expect(result.success).toBe(true)
    })

    it('应该处理边界条件：空值/null/undefined', async () => {
      // 测试空输入
      expect(() => targetFunction(null)).toThrow()
      expect(() => targetFunction(undefined)).toThrow()
    })

    it('应该处理边界条件：超长输入', async () => {
      const longInput = 'a'.repeat(10000)
      const result = await targetFunction(longInput)
      expect(result).toMatchObject({ valid: false })
    })

    it('应该抛出正确类型的错误', async () => {
      await expect(targetFunction(invalidInput))
        .rejects
        .toThrowError(ValidationError)
    })
  })
})

// 异步测试模板
describe('异步操作', () => {
  it('应该正确处理异步结果', async () => {
    vi.useFakeTimers()
    
    const promise = asyncFunction()
    
    vi.advanceTimersByTime(1000)
    
    const result = await promise
    expect(result).toBe('expected')
    
    vi.useRealTimers()
  })
})

// Mock 外部依赖模板
describe('Mock 外部服务', () => {
  const mockDb = {
    query: vi.fn(),
    insert: vi.fn(),
    update: vi.fn()
  }

  const mockLogger = {
    info: vi.fn(),
    error: vi.fn(),
    warn: vi.fn()
  }

  it('应该调用数据库正确次数', async () => {
    mockDb.query.mockResolvedValue({ rows: [] })
    
    await targetFunction()
    
    expect(mockDb.query).toHaveBeenCalledTimes(1)
  })

  it('不应该记录敏感数据', async () => {
    await targetFunction({ password: 'secret123' })
    
    expect(mockLogger.info).not.toHaveBeenCalledWith(
      expect.stringContaining('secret123')
    )
  })
})

// 参数化测试模板
describe('参数化测试', () => {
  const testCases = [
    { input: '', expected: false, description: '空字符串' },
    { input: 'short', expected: false, description: '过短输入' },
    { input: 'valid@example.com', expected: true, description: '有效邮箱' },
    { input: 'invalid@email', expected: false, description: '无效域名' }
  ]

  testCases.forEach(({ input, expected, description }) => {
    it(`应该${expected ? '接受' : '拒绝'}${description}`, () => {
      expect(validateEmail(input)).toBe(expected)
    })
  })
})
