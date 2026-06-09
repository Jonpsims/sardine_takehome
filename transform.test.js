const { sampleData } = require('./testdata')
const { transformCanvas } = require('./transform')



//Use Case Count
test('Use Case Count', () => {
    const result = transformCanvas('test-id-123',sampleData)
    expect(result.canvases[0].uc_count).toBe(3)
})

//FDE Total Hours
test('FDE Total Hours', () => {
    const result = transformCanvas('test-id-123',sampleData)
    expect(result.canvases[0].fde_total_hours).toBe(172)
})

//Use cases contains row with uc_id: CUSTOM-001 and is_custom: true
test('canvas_use_cases contains row with uc_id: CUSTOM-001 and is_custom: true', () => {
    const result = transformCanvas('test-id-123',sampleData)
    const row = result.canvas_use_cases.find(r => r.uc_id === 'CUSTOM-001')
    expect(row.is_custom).toBe(true)
})

//Row for UC-09 has phase as an integer
test('Row for UC-09 has phase as an integer', () => {
    const result = transformCanvas('test-id-123',sampleData)
    const row = result.canvas_use_cases.find(r => r.uc_id === 'UC-09')
    expect(row.phase).toBe(2)
    expect(typeof row.phase).toBe('number')
})

//Row for fde-002 has correct total_hours and complexity_factor_count
test('Row for fde-002 has correct total_hours and complexity_factor_count', () => {
    const result = transformCanvas('test-id-123',sampleData)
    const row = result.canvas_fde_items.find(r => r.item_id === 'fde-002')
    expect(row.total_hours).toBe(120)
    expect(row.complexity_factor_count).toBe(2)
})

//Canvas with engagementPhase missing or undefined
test('Canvas with engagementPhase missing or undefined', () => {
    const dataNoPhase = { ...sampleData, engagementPhase: undefined}
    const result = transformCanvas('test-id-123',dataNoPhase)
    expect(result.canvases[0].engagement_phase).toBe(1)
})

//BONUS, Row for flow-002 has use_case_ids as an array
test('Row for flow-002 has use_case_ids as an array', () => {
    const result = transformCanvas('test-id-123',sampleData)
    const row = result.canvas_flows.find(r => r.flow_id === 'flow-002')
    expect(Array.isArray(row.use_case_ids)).toBe(true)
})